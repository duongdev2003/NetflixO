import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../Components/Table2";
import CategoryModal from "../../../Components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction } from "../../../Redux/Actions/CategoriesActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notficaltions/Loader";
import { Empty } from "../../../Components/Notficaltions/Empty";

function Categories() {
    const [modalOpen, setModalOpen] = useState(false);
    const [category, setCategory] = useState();
    const dispatch = useDispatch();

    // All categories
    const { categories, isLoading } = useSelector(
        (state) => state.categoryGetAll
    );

    // Delete categories
    const { isSuccess, isError } = useSelector((state) => state.categoryDelete);
    const adminDeletecategory = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
            dispatch(deleteCategoryAction(id));
        }
    };

    const OnEditFunction = (id) => {
        setCategory(id);
        setModalOpen(!modalOpen);
    };

    useEffect(() => {
        if (isError) {
            toast.error(isError);
            dispatch({ type: "DELETE_CATEGORY_RESET" });
        }
        if (isSuccess) {
            dispatch({ type: "DELETE_CATEGORY_RESET" });
        }

        if (modalOpen === false) {
            setCategory();
        }
    }, [modalOpen, dispatch, isError, isSuccess]);

    return (
        <SideBar>
            <CategoryModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                category={category}
            />
            <div className="flex flex-col gap-6">
                <div className="flex-btn gap-2">
                    <h2 className="text-xl font-bold">Thể Loại</h2>
                    <button
                        onClick={() => setModalOpen(true)}
                        className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
                    >
                        <HiPlusCircle /> Thêm mới
                    </button>
                </div>
                {isLoading ? (
                    <Loader />
                ) : categories?.length > 0 ? (
                    <Table2
                        data={categories}
                        users={false}
                        OnEditFunction={OnEditFunction}
                        onDeleteFunction={adminDeletecategory}
                    />
                ) : (
                    <Empty message="Bạn không có danh mục nào." />
                )}
            </div>
        </SideBar>
    );
}

export default Categories;
