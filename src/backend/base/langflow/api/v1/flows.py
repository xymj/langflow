from datetime import datetime, timezone
from typing import List
from uuid import UUID

import orjson
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.encoders import jsonable_encoder
from loguru import logger
from sqlmodel import Session, col, select

from langflow.api.utils import remove_api_keys, validate_is_component
from langflow.api.v1.schemas import FlowListCreate, FlowListRead
from langflow.initial_setup.setup import STARTER_FOLDER_NAME
from langflow.services.auth.utils import get_current_active_user
from langflow.services.database.models.flow import Flow, FlowCreate, FlowRead, FlowUpdate
from langflow.services.database.models.flow.utils import get_webhook_component_in_flow
from langflow.services.database.models.folder.constants import DEFAULT_FOLDER_NAME
from langflow.services.database.models.folder.model import Folder
from langflow.services.database.models.user.model import User
from langflow.services.deps import get_session, get_settings_service
from langflow.services.settings.service import SettingsService

# build router
router = APIRouter(prefix="/flows", tags=["Flows"])

# Depends作用
# Depends 是一个函数依赖注入的机制，通常用于 FastAPI 框架中。Depends 用于声明其他函数或类作为依赖项，这些依赖项将自动注入到你的函数中。它用于简化依赖关系的管理，使代码更加模块化和可复用。
# 让我们分解一下你的函数定义，并解释 Depends 的作用：
# python
# Copy
# from fastapi import Depends
# from sqlalchemy.orm import Session
# from some_module import get_session, get_current_active_user
# from some_other_module import FlowCreate, User
#
# def create_flow(
#     *,
#     session: Session = Depends(get_session),
#     flow: FlowCreate,
#     current_user: User = Depends(get_current_active_user),
# ):
#     # 函数主体省略
# 详细说明
# session: Session = Depends(get_session)
# 这一行表示 session 参数的值将通过调用 get_session 函数自动获取。get_session 函数通常是用来获取一个数据库会话（session）的，例如：
# python
# Copy
# def get_session():
#     session = create_session()  # 创建数据库会话
#     try:
#         yield session
#     finally:
#         session.close()
# 这样，无需在每个需要数据库会话的地方手动创建和关闭会话，FastAPI 会自动管理这个依赖关系。
# current_user: User = Depends(get_current_active_user)
# 这一行表示 current_user 参数的值将通过调用 get_current_active_user 函数自动获取。get_current_active_user 通常是用来获取当前认证的用户对象的，例如：
# python
# Copy
# def get_current_active_user(session: Session = Depends(get_session)):
#     user = get_user_from_token()  # 从令牌中获取用户信息
#     if not user:
#         raise HTTPException(status_code=400, detail="Invalid authentication credentials")
#     return user
# 这样可以确保只有认证通过的用户才能调用 create_flow 函数。
# 总结
# Depends 用于声明依赖项，确保所需的依赖项在调用函数时自动获取并注入。
# session: Session = Depends(get_session) 会自动注入一个数据库会话。
# current_user: User = Depends(get_current_active_user) 会自动注入当前认证的用户。
# 这种依赖注入机制使得代码更加模块化、可复用，同时简化了依赖关系的管理，非常适合用于需要多个依赖项的复杂应用。
# 完整示例
# 以下是一个完整的示例，展示了如何使用 Depends 进行依赖注入：
# python
# Copy
# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# from pydantic import BaseModel
#
# app = FastAPI()
#
# # 模拟数据库会话创建函数
# def get_session():
#     session = create_session()  # 创建数据库会话
#     try:
#         yield session
#     finally:
#         session.close()
#
# # 模拟获取当前用户的函数
# def get_current_active_user(session: Session = Depends(get_session)):
#     user = get_user_from_token(session)  # 从令牌中获取用户信息
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid authentication credentials")
#     return user
#
# # 数据模型类
# class FlowCreate(BaseModel):
#     name: str
#
# class User(BaseModel):
#     id: int
#     username: str
#
# # 业务处理函数
# @app.post("/flows/")
# def create_flow(
#     *,
#     session: Session = Depends(get_session),
#     flow: FlowCreate,
#     current_user: User = Depends(get_current_active_user),
# ):
#     # 这里会自动获取 `session` 和 `current_user`
#     # 处理业务逻辑
#     return {"message": "Flow created", "flow": flow, "user": current_user}
# 通过这种方式，依赖关系变得清晰且易于管理，非常有助于构建可维护和可扩展的应用。


# 参数列表中的 * 号作用
# 在 Python 函数定义中，参数列表中的 * 号（星号）有特殊的含义。它用来强制要求其后的所有参数必须以关键字参数（keyword-only arguments）的形式传递，而不能作为位置参数（positional arguments）传递。
# 让我们通过一个简单的例子来解释这一点：
# python
# Copy
# def example_function(a, b, *, c, d):
#     print(a, b, c, d)
# 在这个例子中，参数 a 和 b 可以作为位置参数传递，而 c 和 d 必须作为关键字参数传递。这意味着你必须像这样调用函数：
# python
# Copy
# example_function(1, 2, c=3, d=4)  # 合法调用
# 如果你尝试使用位置参数来传递 c 和 d，将会导致错误：
# python
# Copy
# example_function(1, 2, 3, 4)  # 非法调用，会报错
# 回到你的代码
# 在你的 create_flow 函数中，使用 * 号的作用同样是强制要求 session、flow 和 current_user 参数必须作为关键字参数传递：
# python
# Copy
# def create_flow(
#     *,
#     session: Session = Depends(get_session),
#     flow: FlowCreate,
#     current_user: User = Depends(get_current_active_user),
# ):
#     # 函数主体省略
# 这意味着你必须这样调用 create_flow 函数：
# python
# Copy
# create_flow(session=my_session, flow=my_flow, current_user=my_user)
# 只能通过关键字参数的形式传递这些参数，不能使用位置参数。
# 为什么使用关键字参数？
# 使用关键字参数有以下几个优点：
# 可读性更好：调用函数时，可以明确地看到每个参数的名称和对应的值。
# 减少错误：避免参数顺序错误引起的问题。
# 灵活性：允许提供默认值的参数可以省略，只有需要的才传递。
# 取代位置参数的典型场景
# 在使用依赖注入时，特别是在 Web 框架如 FastAPI 中，很多时候会定义多个依赖项和参数。这时使用关键字参数可以使代码更清晰、易读，并减少错误。
# 完整示例
# 以下是一个更完整的示例，展示了如何使用星号来强制关键字参数：
# python
# Copy
# from fastapi import FastAPI, Depends, HTTPException
# from sqlalchemy.orm import Session
# from pydantic import BaseModel
#
# app = FastAPI()
#
# # 模拟数据库会话创建函数
# def get_session():
#     session = create_session()  # 创建数据库会话
#     try:
#         yield session
#     finally:
#         session.close()
#
# # 模拟获取当前用户的函数
# def get_current_active_user(session: Session = Depends(get_session)):
#     user = get_user_from_token(session)  # 从令牌中获取用户信息
#     if not user:
#         raise HTTPException(status_code=401, detail="Invalid authentication credentials")
#     return user
#
# # 数据模型类
# class FlowCreate(BaseModel):
#     name: str
#
# class User(BaseModel):
#     id: int
#     username: str
#
# # 业务处理函数
# @app.post("/flows/")
# def create_flow(
#     *,
#     session: Session = Depends(get_session),
#     flow: FlowCreate,
#     current_user: User = Depends(get_current_active_user),
# ):
#     # 这里会自动获取 `session` 和 `current_user`
#     # 处理业务逻辑
#     return {"message": "Flow created", "flow": flow, "user": current_user}
# 通过这种方式，确保 create_flow 函数的所有参数都被明确地作为关键字参数传递，从而提高代码的可读性和可维护性。

@router.post("/", response_model=FlowRead, status_code=201)
def create_flow(
    *,
    session: Session = Depends(get_session),
    flow: FlowCreate,
    current_user: User = Depends(get_current_active_user),
):
    try:
        """Create a new flow."""
        if flow.user_id is None:
            flow.user_id = current_user.id

        # First check if the flow.name is unique
        # there might be flows with name like: "MyFlow", "MyFlow (1)", "MyFlow (2)"
        # so we need to check if the name is unique with `like` operator
        # if we find a flow with the same name, we add a number to the end of the name
        # based on the highest number found
        if session.exec(select(Flow).where(Flow.name == flow.name).where(Flow.user_id == current_user.id)).first():
            flows = session.exec(
                select(Flow).where(Flow.name.like(f"{flow.name} (%")).where(Flow.user_id == current_user.id)  # type: ignore
            ).all()
            if flows:
                numbers = [int(flow.name.split("(")[1].split(")")[0]) for flow in flows]
                flow.name = f"{flow.name} ({max(numbers) + 1})"
            else:
                flow.name = f"{flow.name} (1)"
        # Now check if the endpoint is unique
        if (
            flow.endpoint_name
            and session.exec(
                select(Flow).where(Flow.endpoint_name == flow.endpoint_name).where(Flow.user_id == current_user.id)
            ).first()
        ):
            flows = session.exec(
                select(Flow)
                .where(Flow.endpoint_name.like(f"{flow.endpoint_name}-%"))  # type: ignore
                .where(Flow.user_id == current_user.id)
            ).all()
            if flows:
                # The endpoitn name is like "my-endpoint","my-endpoint-1", "my-endpoint-2"
                # so we need to get the highest number and add 1
                # we need to get the last part of the endpoint name
                numbers = [int(flow.endpoint_name.split("-")[-1]) for flow in flows]  # type: ignore
                flow.endpoint_name = f"{flow.endpoint_name}-{max(numbers) + 1}"
            else:
                flow.endpoint_name = f"{flow.endpoint_name}-1"

        db_flow = Flow.model_validate(flow, from_attributes=True)
        db_flow.updated_at = datetime.now(timezone.utc)

        if db_flow.folder_id is None:
            # Make sure flows always have a folder
            default_folder = session.exec(
                select(Folder).where(Folder.name == DEFAULT_FOLDER_NAME, Folder.user_id == current_user.id)
            ).first()
            if default_folder:
                db_flow.folder_id = default_folder.id

        session.add(db_flow)
        session.commit()
        session.refresh(db_flow)
        return db_flow
    except Exception as e:
        # If it is a validation error, return the error message
        if hasattr(e, "errors"):
            raise HTTPException(status_code=400, detail=str(e)) from e
        elif "UNIQUE constraint failed" in str(e):
            # Get the name of the column that failed
            columns = str(e).split("UNIQUE constraint failed: ")[1].split(".")[1].split("\n")[0]
            # UNIQUE constraint failed: flow.user_id, flow.name
            # or UNIQUE constraint failed: flow.name
            # if the column has id in it, we want the other column
            column = columns.split(",")[1] if "id" in columns.split(",")[0] else columns.split(",")[0]

            raise HTTPException(
                status_code=400, detail=f"{column.capitalize().replace('_', ' ')} must be unique"
            ) from e
        elif isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e)) from e


@router.get("/", response_model=list[FlowRead], status_code=200)
def read_flows(
    *,
    current_user: User = Depends(get_current_active_user),
    session: Session = Depends(get_session),
    settings_service: "SettingsService" = Depends(get_settings_service),
    remove_example_flows: bool = False,
):
    """
    Retrieve a list of flows.

    Args:
        current_user (User): The current authenticated user.
        session (Session): The database session.
        settings_service (SettingsService): The settings service.
        remove_example_flows (bool, optional): Whether to remove example flows. Defaults to False.


    Returns:
        List[Dict]: A list of flows in JSON format.
    """

    try:
        auth_settings = settings_service.auth_settings
        if auth_settings.AUTO_LOGIN:
            flows = session.exec(
                select(Flow).where(
                    (Flow.user_id == None) | (Flow.user_id == current_user.id)  # noqa
                )
            ).all()
        else:
            flows = current_user.flows

        flows = validate_is_component(flows)  # type: ignore
        flow_ids = [flow.id for flow in flows]
        # with the session get the flows that DO NOT have a user_id
        if not remove_example_flows:
            try:
                folder = session.exec(select(Folder).where(Folder.name == STARTER_FOLDER_NAME)).first()

                example_flows = folder.flows if folder else []
                for example_flow in example_flows:
                    if example_flow.id not in flow_ids:
                        flows.append(example_flow)  # type: ignore
            except Exception as e:
                logger.error(e)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
    return [jsonable_encoder(flow) for flow in flows]


@router.get("/{flow_id}", response_model=FlowRead, status_code=200)
def read_flow(
    *,
    session: Session = Depends(get_session),
    flow_id: UUID,
    current_user: User = Depends(get_current_active_user),
    settings_service: "SettingsService" = Depends(get_settings_service),
):
    """Read a flow."""
    auth_settings = settings_service.auth_settings
    stmt = select(Flow).where(Flow.id == flow_id)
    if auth_settings.AUTO_LOGIN:
        # If auto login is enable user_id can be current_user.id or None
        # so write an OR
        stmt = stmt.where(
            (Flow.user_id == current_user.id) | (Flow.user_id == None)  # noqa
        )  # noqa
    if user_flow := session.exec(stmt).first():
        return user_flow
    else:
        raise HTTPException(status_code=404, detail="Flow not found")


@router.patch("/{flow_id}", response_model=FlowRead, status_code=200)
def update_flow(
    *,
    session: Session = Depends(get_session),
    flow_id: UUID,
    flow: FlowUpdate,
    current_user: User = Depends(get_current_active_user),
    settings_service=Depends(get_settings_service),
):
    """Update a flow."""
    try:
        db_flow = read_flow(
            session=session,
            flow_id=flow_id,
            current_user=current_user,
            settings_service=settings_service,
        )
        if not db_flow:
            raise HTTPException(status_code=404, detail="Flow not found")
        flow_data = flow.model_dump(exclude_unset=True)
        if settings_service.settings.remove_api_keys:
            flow_data = remove_api_keys(flow_data)
        for key, value in flow_data.items():
            if value is not None:
                setattr(db_flow, key, value)
        webhook_component = get_webhook_component_in_flow(db_flow.data)
        db_flow.webhook = webhook_component is not None
        db_flow.updated_at = datetime.now(timezone.utc)

        # First check if the flow.name is unique
        # there might be flows with name like: "MyFlow", "MyFlow (1)", "MyFlow (2)"
        # so we need to check if the name is unique with `like` operator
        # if we find a flow with the same name, we add a number to the end of the name
        # based on the highest number found
        flow_from_db = session.exec(select(Flow).where(Flow.id == flow_id, Flow.user_id == current_user.id)).first()
        if flow_from_db:
            flows = session.exec(
                select(Flow).where(Flow.name.like(f"{flow.name} (%")).where(Flow.user_id == current_user.id)  # type: ignore
            ).all()
            if flows:
                numbers = [int(flow.name.split("(")[1].split(")")[0]) for flow in flows]
                flow.name = f"{flow.name} ({max(numbers) + 1})"
            else:
                flow.name = f"{flow.name} (1)"

        if db_flow.folder_id is None:
            default_folder = session.exec(select(Folder).where(Folder.name == DEFAULT_FOLDER_NAME)).first()
            if default_folder:
                db_flow.folder_id = default_folder.id
        session.add(db_flow)
        session.commit()
        session.refresh(db_flow)
        return db_flow
    except Exception as e:
        # If it is a validation error, return the error message
        if hasattr(e, "errors"):
            raise HTTPException(status_code=400, detail=str(e)) from e
        elif "UNIQUE constraint failed" in str(e):
            # Get the name of the column that failed
            columns = str(e).split("UNIQUE constraint failed: ")[1].split(".")[1].split("\n")[0]
            # UNIQUE constraint failed: flow.user_id, flow.name
            # or UNIQUE constraint failed: flow.name
            # if the column has id in it, we want the other column
            column = columns.split(",")[1] if "id" in columns.split(",")[0] else columns.split(",")[0]

            raise HTTPException(
                status_code=400, detail=f"{column.capitalize().replace('_', ' ')} must be unique"
            ) from e
        elif isinstance(e, HTTPException):
            raise e
        else:
            raise HTTPException(status_code=500, detail=str(e)) from e


@router.delete("/{flow_id}", status_code=200)
def delete_flow(
    *,
    session: Session = Depends(get_session),
    flow_id: UUID,
    current_user: User = Depends(get_current_active_user),
    settings_service=Depends(get_settings_service),
):
    """Delete a flow."""
    flow = read_flow(
        session=session,
        flow_id=flow_id,
        current_user=current_user,
        settings_service=settings_service,
    )
    if not flow:
        raise HTTPException(status_code=404, detail="Flow not found")
    session.delete(flow)
    session.commit()
    return {"message": "Flow deleted successfully"}


@router.post("/batch/", response_model=List[FlowRead], status_code=201)
def create_flows(
    *,
    session: Session = Depends(get_session),
    flow_list: FlowListCreate,
    current_user: User = Depends(get_current_active_user),
):
    """Create multiple new flows."""
    db_flows = []
    for flow in flow_list.flows:
        flow.user_id = current_user.id
        db_flow = Flow.model_validate(flow, from_attributes=True)
        session.add(db_flow)
        db_flows.append(db_flow)
    session.commit()
    for db_flow in db_flows:
        session.refresh(db_flow)
    return db_flows


@router.post("/upload/", response_model=List[FlowRead], status_code=201)
async def upload_file(
    *,
    session: Session = Depends(get_session),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user),
):
    """Upload flows from a file."""
    contents = await file.read()
    data = orjson.loads(contents)
    if "flows" in data:
        flow_list = FlowListCreate(**data)
    else:
        flow_list = FlowListCreate(flows=[FlowCreate(**data)])
    # Now we set the user_id for all flows
    for flow in flow_list.flows:
        flow.user_id = current_user.id

    return create_flows(session=session, flow_list=flow_list, current_user=current_user)


@router.get("/download/", response_model=FlowListRead, status_code=200)
async def download_file(
    *,
    session: Session = Depends(get_session),
    settings_service: "SettingsService" = Depends(get_settings_service),
    current_user: User = Depends(get_current_active_user),
):
    """Download all flows as a file."""
    flows = read_flows(current_user=current_user, session=session, settings_service=settings_service)
    return FlowListRead(flows=flows)


@router.delete("/")
async def delete_multiple_flows(
    flow_ids: List[UUID], user: User = Depends(get_current_active_user), db: Session = Depends(get_session)
):
    """
    Delete multiple flows by their IDs.

    Args:
        flow_ids (List[str]): The list of flow IDs to delete.
        user (User, optional): The user making the request. Defaults to the current active user.

    Returns:
        dict: A dictionary containing the number of flows deleted.

    """
    try:
        deleted_flows = db.exec(select(Flow).where(col(Flow.id).in_(flow_ids)).where(Flow.user_id == user.id)).all()
        for flow in deleted_flows:
            db.delete(flow)
        db.commit()
        return {"deleted": len(deleted_flows)}
    except Exception as exc:
        logger.exception(exc)
        raise HTTPException(status_code=500, detail=str(exc)) from exc
