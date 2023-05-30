import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../app/features/userSlice';
import { fetchAsyncTitle, getTitles, deleteTitle, updateTitle, addNewTitle } from '../app/features/titleSlice';
import { deleteTitleRequest, postNewTitleRequest, updateTitleRequest } from '../api/apiTitleCalls';
import Table from '../components/Table';

const headers = [
    "#",
    "Title Name",
    "Created Time",
    "Updated Time",
    "Actions"
]


function TitlePage() {

    const dispatch = useDispatch();

    const [updatedTitle, setUpdatedTitle] = useState({});
    const [searchTitle, setSearchTitle] = useState([]);
    const [titleName, setTitleName] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const token = useSelector(getToken);
    const titles = useSelector(getTitles);

    const handleShowAdd = () => setShowAdd(!showAdd);
    const handleShowUpdate = (title) => {
        setShowUpdate(!showUpdate);
        setUpdatedTitle(title);
    }

    const searchHandler = (e) => {
        if (e.target.value) {
            const searchedTitle = titles.filter(title => {
                return title.titleName.toLocaleLowerCase('tr-TR').includes(e.target.value.toLocaleLowerCase('tr-TR'));
            })
            setSearchTitle(searchedTitle);
        }
        else {
            setSearchTitle(titles);
        }
    }

    const deleteHandler = (title) => {
        deleteTitleRequest({ "id": title._id }, token);
        dispatch(deleteTitle(title));
    };

    const updateHandler = (e) => {
        e.preventDefault();
        updateTitleRequest({ "id": updatedTitle._id, "titleName": updatedTitle.titleName }, token);
        dispatch(updateTitle(updatedTitle));
        setShowUpdate(!showUpdate);
        setTitleName("");
    }

    const updateTitleName = (e) => {
        setTitleName(e.target.value);
        setUpdatedTitle({ ...updatedTitle, titleName: e.target.value });
    }
    const newTitleName = (e) => {
        setTitleName(e.target.value);
    }

    const addHandler = async (e) => {
        e.preventDefault();
        let result = await postNewTitleRequest({ "titleName": titleName }, token);
        dispatch(addNewTitle(result.data));
        setShowAdd(!showAdd);
        setTitleName("");
    }

    useEffect(() => {
        if (token)
            dispatch(fetchAsyncTitle(token));

    }, [dispatch, token])

    useEffect(() => {
        setSearchTitle(titles)
    }, [titles])



    return token ? (
        <div className="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">

                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" onChange={searchHandler} type="search" placeholder="Search Title" aria-label="Search" />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Title Details</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShowAdd}>
                            Add New Title
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered">
                            <Table headers={headers} />
                            <tbody>
                                {searchTitle && searchTitle.map((title, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{title.titleName}</td>
                                            <td>{title.createdAt}</td>
                                            <td>{title.updatedAt}</td>
                                            <td>
                                                <Button className='me-2' onClick={() => handleShowUpdate(title)} variant="info">Update</Button>
                                                <Button variant="danger" onClick={() => deleteHandler(title)}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* <!---Add Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={showAdd}
                        onHide={handleShowAdd}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Add Title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <input type="text" onChange={newTitleName} className="form-control" placeholder="Enter Title" />
                                </div>

                                <button type="submit" onClick={addHandler} disabled={!titleName} className="btn btn-success mt-4">Add Title</button>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setShowAdd(!showAdd); setTitleName(""); }}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    {/*Add Model Box Finsihs */}
                </div>
                {/* <!---Update Model Box ---> */}
                <div className="model_box">
                    <Modal
                        show={showUpdate}
                        onHide={handleShowUpdate}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header>
                            <Modal.Title>Update Title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <input type="text" onChange={updateTitleName} className="form-control" placeholder="Enter Title" />
                                </div>
                                <button type="submit" onClick={updateHandler} disabled={!titleName} className="btn btn-success mt-4">Update Title</button>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setShowUpdate(!showUpdate); setUpdatedTitle({}); setTitleName("") }}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>

                    {/* Update Model Box Finsihs */}
                </div>
            </div>
        </div>
    ) : (<div>veri yok</div>)
}

export default TitlePage