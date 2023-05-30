import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../app/features/userSlice';
import { addNewConsumable, deleteConsumable, fetchAsyncConsumable, getConsumables, updateConsumable } from '../app/features/consumableSlice';
import { deleteConsumableRequest, getConsumableByIDRequest, postNewConsumableRequest, updateConsumableRequest } from '../api/apiConsumableCalls';
import { getTitles } from '../app/features/titleSlice';
import Table from '../components/Table';

const headers = [
    "#",
    "Name",
    "Price",
    "Description",
    "Type",
    "Image",
    "Created Time",
    "Updated Time",
    "Actions"
]

const ConsumablePage = () => {

    const dispatch = useDispatch();

    const token = useSelector(getToken);
    const consumables = useSelector(getConsumables);
    const titles = useSelector(getTitles);

    const [newConsumable, setNewConsumable] = useState({});
    const [searchConsumable, setSearchConsumable] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleShowAdd = () => setShowAdd(!showAdd);
    const handleShowUpdate = async (id) => {
        const consumable = await getConsumableByIDRequest(id, token)
        setNewConsumable({ ...consumable.data, image: "" });
        setShowUpdate(!showUpdate);
    }

    const searchHandler = (e) => {
        if (e.target.value) {
            const searchedConsumable = consumables.filter(consumable => {
                return consumable.name.toLocaleLowerCase('tr-TR').includes(e.target.value.toLocaleLowerCase('tr-TR'));
            })
            setSearchConsumable(searchedConsumable);
        }
        else {
            setSearchConsumable(consumables);
        }
    }

    const deleteHandler = (consumable) => {
        deleteConsumableRequest({ "id": consumable._id }, token);
        dispatch(deleteConsumable(consumable));
    };

    const addHandler = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append('image', newConsumable.image);
        formdata.append('name', newConsumable.name);
        formdata.append('price', newConsumable.price);
        formdata.append('type', newConsumable.type);
        formdata.append('description', newConsumable.description);
        let result = await postNewConsumableRequest(formdata, token);
        dispatch(addNewConsumable(result.data));
        setShowAdd(!showAdd);
        setNewConsumable({});
    }

    const updateHandler = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append('id', newConsumable._id);
        formdata.append('image', newConsumable.image);
        formdata.append('name', newConsumable.name);
        formdata.append('price', newConsumable.price);
        formdata.append('type', newConsumable.type);
        formdata.append('description', newConsumable.description);
        let result = await updateConsumableRequest(formdata, token);
        dispatch(updateConsumable(result.data));
        setShowUpdate(!showUpdate);
        setNewConsumable({});
    }

    const handleFile = (e) => {
        let file = e.target.files[0];
        setNewConsumable({ ...newConsumable, image: file });
    }

    useEffect(() => {
        if (token)
            dispatch(fetchAsyncConsumable(token));

    }, [dispatch, token])

    useEffect(() => {
        setSearchConsumable(consumables)
    }, [consumables])

    return token ? (
        <div className="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">

                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" onChange={searchHandler} type="search" placeholder="Search Consumable" aria-label="Search" />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Consumable Details</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShowAdd}>
                            Add New Consumable
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered">
                            <Table headers={headers} />
                            <tbody>
                                {searchConsumable && searchConsumable.map((consumable, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{consumable.name}</td>
                                            <td>{consumable.price}</td>
                                            <td>{consumable.description}</td>
                                            <td>{consumable.type}</td>
                                            <td><img src={`http://localhost:5000/${consumable.image}`} alt={consumable.name} className="img-fluid "></img></td>
                                            <td>{consumable.createdAt}</td>
                                            <td>{consumable.updatedAt}</td>
                                            <td>
                                                <Button className='me-2' onClick={() => handleShowUpdate(consumable._id)} variant="info">Update</Button>
                                                <Button variant="danger" onClick={() => deleteHandler(consumable)} >Delete</Button>
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
                            <Modal.Title>Add Consumable</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <input type="text" onChange={(e) => setNewConsumable({ ...newConsumable, name: e.target.value })} className="form-control" placeholder="Enter Name" />
                                    <input type="text" onChange={(e) => setNewConsumable({ ...newConsumable, price: e.target.value })} className="form-control" placeholder="Enter Price" />
                                    <input type="text" onChange={(e) => setNewConsumable({ ...newConsumable, description: e.target.value })} className="form-control" placeholder="Enter Description" />
                                    {/*  <input type="text" onChange={} className="form-control" placeholder="Enter Type" /> */}
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" type="button" >
                                            {newConsumable.type || "Select Type"}
                                        </button>
                                        <ul className="dropdown-menu" >
                                            {titles && titles.map((title) => {
                                                return (<li key={title.titleName}><div onClick={(e) => { setNewConsumable({ ...newConsumable, type: e.target.textContent }); }} className="dropdown-item" >{title.titleName}</div></li>)
                                            })}

                                        </ul>
                                    </div>
                                    <input type="file" name='file' onChange={handleFile} className="form-control" placeholder="Enter Image" />

                                </div>

                                <button type="submit" disabled={!newConsumable.name || !newConsumable.price || !newConsumable.description || !newConsumable.type || !newConsumable.image} onClick={addHandler} className="btn btn-success mt-4">Add Consumable</button>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setShowAdd(!showAdd); setNewConsumable({}); }}>
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
                            <Modal.Title>Update Consumable</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <input type="text" onChange={(e) => setNewConsumable({ ...newConsumable, name: e.target.value })} className="form-control" value={newConsumable.name} />
                                    <input type="text" onChange={(e) => setNewConsumable({ ...newConsumable, price: e.target.value })} className="form-control" value={newConsumable.price} />
                                    <input type="text" onChange={(e) => setNewConsumable({ ...newConsumable, description: e.target.value })} className="form-control" value={newConsumable.description} />
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" type="button" value={newConsumable.type} >
                                            {newConsumable.type}
                                        </button>
                                        <ul className="dropdown-menu" >
                                            {titles && titles.map((title) => {
                                                return (<li key={title.titleName}><div onClick={(e) => { setNewConsumable({ ...newConsumable, type: e.target.textContent }); }} className="dropdown-item" >{title.titleName}</div></li>)
                                            })}

                                        </ul>
                                    </div>
                                    <input type="file" name='file' onChange={handleFile} className="form-control" />
                                </div>
                                <button type="submit" disabled={!newConsumable.name || !newConsumable.price || !newConsumable.description || !newConsumable.type || !newConsumable.image} onClick={updateHandler} className="btn btn-success mt-4">Update Consumable</button>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setShowUpdate(!showUpdate); setNewConsumable({}) }}>
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

export default ConsumablePage