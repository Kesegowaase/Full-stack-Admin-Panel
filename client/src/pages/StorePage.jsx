import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../app/features/userSlice';
import { addNewStore, deleteStore, fetchAsyncStore, getStores, updateStore } from '../app/features/storeSlice';
import { deleteStoreRequest, getStoreByIDRequest, postNewStoreRequest, updateStoreRequest } from '../api/apiStoreCalls';
import Table from '../components/Table';

const headers = [
    "#",
    "Name",
    "Address",
    "Phone Number",
    "Working Hours",
    "Map Link",
    "Image",
    "Created Time",
    "Updated Time",
    "Actions"
]

const StorePage = () => {

    const dispatch = useDispatch();

    const token = useSelector(getToken);
    const stores = useSelector(getStores);

    const [newStore, setNewStore] = useState({});
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [searcStore, setSearchStore] = useState([]);

    const handleShowAdd = () => setShowAdd(!showAdd);
    const handleShowUpdate = async (id) => {
        const store = await getStoreByIDRequest(id, token)
        setNewStore({ ...store.data, image: "" });
        setShowUpdate(!showUpdate);
    }

    const searchHandler = (e) => {
        if (e.target.value) {
            const searchedStore = stores.filter(store => {
                return store.name.toLocaleLowerCase('tr-TR').includes(e.target.value.toLocaleLowerCase('tr-TR'));
            })
            setSearchStore(searchedStore);
        }
        else {
            setSearchStore(stores);
        }
    }

    const addHandler = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append('image', newStore.image);
        formdata.append('name', newStore.name);
        formdata.append('address', newStore.address);
        formdata.append('phoneNumber', newStore.phoneNumber);
        formdata.append('workingHours', newStore.workingHours);
        formdata.append('mapLink', newStore.mapLink);
        let result = await postNewStoreRequest(formdata, token);
        dispatch(addNewStore(result.data));
        setShowAdd(!showAdd);
        setNewStore({});
    }

    const updateHandler = async (e) => {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append('id', newStore._id);
        formdata.append('image', newStore.image);
        formdata.append('name', newStore.name);
        formdata.append('address', newStore.address);
        formdata.append('phoneNumber', newStore.phoneNumber);
        formdata.append('workingHours', newStore.workingHours);
        formdata.append('mapLink', newStore.mapLink);
        let result = await updateStoreRequest(formdata, token);
        dispatch(updateStore(result.data));
        setShowUpdate(!showUpdate);
        setNewStore({});
    }

    const deleteHandler = (store) => {
        deleteStoreRequest({ "id": store._id }, token);
        dispatch(deleteStore(store));
    };


    const handleFile = (e) => {
        let file = e.target.files[0];
        setNewStore({ ...newStore, image: file });
    }


    useEffect(() => {
        if (token)
            dispatch(fetchAsyncStore(token));
    }, [dispatch, token])

    useEffect(() => {
        setSearchStore(stores)
    }, [stores])

    return token ? (
        <div className="container ">
            <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row ">

                    <div className="col-sm-3 mt-5 mb-4 text-gred">
                        <div className="search">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" onChange={searchHandler} type="search" placeholder="Search Store" aria-label="Search" />
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{ color: "green" }}><h2><b>Store Details</b></h2></div>
                    <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
                        <Button variant="primary" onClick={handleShowAdd}>
                            Add New Store
                        </Button>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive " >
                        <table className="table table-striped table-hover table-bordered">
                            <Table headers={headers} />
                            <tbody>
                                {searcStore && searcStore.map((store, index) => {
                                    return (

                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{store.name}</td>
                                            <td>{store.address}</td>
                                            <td>{store.phoneNumber}</td>
                                            <td>{store.workingHours}</td>
                                            <td>{store.mapLink}</td>
                                            <td><img src={`http://localhost:5000/${store.image}`} alt={store.name} className="img-fluid "></img></td>
                                            <td>{store.createdAt}</td>
                                            <td>{store.updatedAt}</td>
                                            <td>
                                                <Button className='me-2' variant="info" onClick={() => handleShowUpdate(store._id)}>Update</Button>
                                                <Button variant="danger" onClick={() => deleteHandler(store)}>Delete</Button>
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
                            <Modal.Title>Add Store</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} className="form-control" placeholder="Enter Name" />
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} className="form-control" placeholder="Enter Address" />
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, phoneNumber: e.target.value })} className="form-control" placeholder="Enter Phone Number" />
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, workingHours: e.target.value })} className="form-control" placeholder="Enter Working Hours" />
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, mapLink: e.target.value })} className="form-control" placeholder="Enter Map Link" />
                                    {/*  <input type="text" onChange={} className="form-control" placeholder="Enter Type" /> */}

                                    <input type="file" name='file' onChange={handleFile} className="form-control" placeholder="Enter Image" />

                                </div>

                                <button type="submit" onClick={addHandler} disabled={!newStore.name || !newStore.address || !newStore.phoneNumber || !newStore.workingHours || !newStore.mapLink || !newStore.image} className="btn btn-success mt-4">Add Store</button>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setShowAdd(!showAdd); setNewStore({}); }}>
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
                            <Modal.Title>Update Store</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} className="form-control" value={newStore.name} />
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} className="form-control" value={newStore.address} />
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, phoneNumber: e.target.value })} className="form-control" value={newStore.phoneNumber} />
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, workingHours: e.target.value })} className="form-control" value={newStore.workingHours} />
                                    <input type="text" onChange={(e) => setNewStore({ ...newStore, mapLink: e.target.value })} className="form-control" value={newStore.mapLink} />

                                    <input type="file" name='file' onChange={handleFile} className="form-control" />
                                </div>
                                <button type="submit" onClick={updateHandler} disabled={!newStore.name || !newStore.address || !newStore.phoneNumber || !newStore.workingHours || !newStore.mapLink || !newStore.image} className="btn btn-success mt-4">Update Store</button>
                            </form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { setShowUpdate(!showUpdate); setNewStore({}) }}>
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

export default StorePage