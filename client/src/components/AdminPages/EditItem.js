import React, {Component} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import "./profile.css";
import axios from 'axios';
import {HOSTNAME} from "../../constants/appConstants";

// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class EditItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editProfile: true, //for modal
            selectedCoverPic: null,
            selectedProfilePic: null,
            openFollower: false,
            users: [],
            openFollowee: false,
            plainArray: [],
            objectArray: [],
            selectedValues: [],
            selectedProduct: this.props.selectedProduct,
            sku: this.props.selectedProduct.sku,
            name: this.props.selectedProduct.name,
            brand: this.props.selectedProduct.brand,
            desc: this.props.selectedProduct.description,
            qty: this.props.selectedProduct.weight,
            unit: this.props.selectedProduct.unit,
            price: this.props.selectedProduct.price,
            imageUrl: this.props.selectedProduct.imageUrl,
            imageFlag: false
        };
        this.onFileChange = this.onFileChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            editProfile: true
        })
    }

    onSelect = (selectedList, selectedItem) => {
        this.state.selectedValues = selectedList;
        console.log(this.state.selectedValues);
    }

    addItem = (val) => {
        console.log("val", val);
        this.setState({
            selectedValues: this.state.selectedValues.push(val)
        })
        console.log("Selected val", this.state.selectedValues);
    }

    editProfile = () => {
        this.setState({editProfile: true});
    };


    cancelEdit = () => {
        this.setState({editProfile: false});
    };

    onCoverPicUploadHandler = (event) => {
        this.setState({
            selectedCoverPic: event.target.files[0]
        });
    };
    onProfilePicUploadHandler = (event) => {
        this.setState({
            selectedProfilePic: event.target.files[0]
        });
    };

    onFileChange(files) {
        this.setState({
            imageFlag: true
        })
        if (files == null || files.length == 0) return;
        let file = files[0];

        const data = new FormData();
        data.append("file", file, file.name);

        let user_id = localStorage.getItem('user_id');
        axios.post(`http://${HOSTNAME}:8080/storage/uploadFile`, data)
            .then(res => {
                if (res.status === 200) {
                    this.setState({imageUrl: res.data});
                }
            })
            .catch(err => console.error(err));
    };

    saveProfile = (e) => {
        // save profile code
        e.preventDefault();
        console.log("Inside createStore", e.target.length)
        const data = new FormData();
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].id !== "") {
                console.log(e.target[i].id);
                console.log(e.target[i].value);
                data[e.target[i].id] = e.target[i].value;
            }
        }
        let store_arr = [];
        this.state.selectedValues.forEach(ele => {
            store_arr.push(ele.value);
        });

        console.log("store_arr", store_arr);
        let updatedData = {
            name: data.name ? data.name : "",
            desc: data.desc ? data.name : "",
            brand: data.brand ? data.brand : "",
            unit: data.unit ? data.unit : "",
            qty: data.qty ? data.qty : "",
            price: data.price ? data.price : "",
            image_url: this.state.imageFlag === true ? this.state.imageUrl : ""
        }

        console.log("edit item", updatedData);
        console.log("sku item", this.state.sku);
        let adminId = localStorage.getItem("id")
        axios.put(`http://${HOSTNAME}:8080/product/${this.state.sku}/${adminId}`, null, {params: updatedData})
            .then((response) => {
                console.log("create data res", response)
            }).catch(err => {
            console.error(err);
        });

        this.cancelEdit();
        alert("Product edited succesfully")
    }

    render() {
        console.log("checking props", JSON.stringify(this.props));
        let usrDetails = this.props.userDetails ? this.props.userDetails : [];
        let usrTweets = this.props.userTweets ? this.props.userTweets : [];
        let userData = usrDetails.data ? usrDetails.data : [];
        let pic = this.props.selectedProduct.imageUrl
        return (
            <div class="profile-container col-sm-12">
                <div class="profile-pic-btn-container row">
                </div>

                <Modal
                    show={this.state.editProfile}
                    onHide={this.cancelEdit}
                    animation={false}
                    scrollable={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Product Info</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="edit-profile-continer">
                            <div class="cover-pic-container row">
                                <input
                                    class="profile-pic-btn"
                                    type="file"
                                    accept="image/*"
                                    id="cover-pic-upload"
                                    onChange={(e) => this.onFileChange(e.target.files)}
                                ></input>

                                <label for="cover-pic-upload">
                                    <img
                                        src={this.state.imageUrl}
                                        width="100%"
                                        height="180px"
                                    />
                                </label>
                            </div>
                        </div>
                        <div class="edit-details-form">
                            <Form onSubmit={this.saveProfile}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        onChange={e => this.setState({name: e.target.value})}
                                        placeholder={this.state.name}
                                        // required
                                        value={this.state.name}
                                    />
                                </Form.Group>
                                <Form.Group controlId="brand">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        // required
                                        type="text"
                                        onChange={e => this.setState({brand: e.target.value})}
                                        placeholder={this.state.brand}
                                        value={this.state.brand}
                                    />
                                </Form.Group>
                                <Form.Group controlId="desc">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        // required 
                                        type="text"
                                        as="textarea"
                                        rows="3"
                                        onChange={e => this.setState({desc: e.target.value})}
                                        placeholder={this.state.desc}
                                        value={this.state.desc}
                                    />
                                </Form.Group>

                                <Form.Group controlId="qty">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        // required   
                                        type="number"
                                        step="0.01" min="0"
                                        onChange={e => this.setState({qty: e.target.value})}
                                        placeholder={this.state.qty}
                                        value={this.state.qty}
                                    />
                                </Form.Group>

                                <Form.Group controlId="unit">
                                    <Form.Label>Unit</Form.Label>
                                    <Form.Control as="select" value={this.state.unit} required>
                                        <option>gram</option>
                                        <option>ounze</option>
                                        <option>piece</option>
                                        <option>gallon</option>
                                        <option>litres</option>
                                        <option>mili Litres</option>
                                        <option>kilo-gram</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price( in Dollars ) </Form.Label>
                                    <Form.Control type="number"
                                                 step="0.01" min="0"
                                                  required
                                                  placeholder={this.state.price}
                                                  onChange={e => this.setState({price: e.target.value})}
                                                  value={this.state.price}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default EditItem;
