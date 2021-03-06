import React, {Component} from "react";
import {connect} from "react-redux";
import {createStore, deleteStore, getStoresByAdmin} from "../../redux/actions/inventoryActions";
import axios from "axios";
import Header from "./Header";
import Products from "./Products";
import "./scss/style.scss";
import {HOSTNAME} from "../../constants/appConstants";

function mapStateToProps(store) {
    return {
        stores: store.inventory.stores,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getStoresByAdmin: (payload) => dispatch(getStoresByAdmin(payload)),
        createStore: (payload) => dispatch(createStore(payload)),
        deleteStore: (payload) => dispatch(deleteStore(payload)),
    };
}

class AdminItems extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storeid: "",
            store: "",
            products: [],
            cart: [],
            totalItems: 0,
            totalAmount: 0,
            term: "",
            category: "",
            cartBounce: false,
            quantity: 0,
            quickViewProduct: {},
            modalActive: false,
            flag: 0
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleMobileSearch = this.handleMobileSearch.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.sumTotalItems = this.sumTotalItems.bind(this);
        this.sumTotalAmount = this.sumTotalAmount.bind(this);
        this.checkProduct = this.checkProduct.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSearchByStoreId = this.handleSearchByStoreId.bind(this);
        this.handleSearchBySku = this.handleSearchBySku.bind(this);
        this.addOne = this.addOne.bind(this);
        this.deleteOne = this.deleteOne.bind(this);
        this.getAll = this.getAll.bind(this);
    }

    // Fetch Initial Set of Products from external API
    getProducts() {
        let url =
            "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json";
        axios.get(url).then(response => {
            console.log(response);
            this.setState({
                products: response.data
            });
        });
    }

    getAll() {
        let adminId = localStorage.getItem("id");
        axios.get(`http://${HOSTNAME}:8080/products/admin/${adminId}`)
            .then((response) => {
                console.log("create data res", response)
                this.setState({
                    products: response.data
                });
            }).catch(err => {
            console.error(err);
        })
    }

    componentWillMount() {
        this.getAll();
    }

    // Search by Keyword
    handleSearch(event) {
        // const searchStoreId = findDOMNode(this.refs.searchStoreId);
        // const searchSku = findDOMNode(this.refs.searchSku);
        // searchStoreId.reset();
        // searchSku.reset();
        this.setState({
            term: event.target.value,
            flag: 0
        });
    }

    // Search by sKU
    handleSearchBySku(event) {
        // const searchBox = findDOMNode(this.refs.searchBox);
        // const searchStoreId = findDOMNode(this.refs.searchStoreId);
        // searchBox.reset();
        // searchStoreId.reset();
        console.log("sku parent page")
        this.setState({
            term: event.target.value,
            flag: 1
        });
    }

    // Search by StoreId
    handleSearchByStoreId(event) {
        // const searchBox = findDOMNode(this.refs.searchBox);
        // const searchSku = findDOMNode(this.refs.searchSku);
        // searchBox.reset();
        // searchSku.reset();
        console.log("store parent page")
        this.setState({
            term: event.target.value,
            flag: 2
        });
    }

    // Mobile Search Reset
    handleMobileSearch() {
        this.setState({term: ""});
    }

    // Filter by Category
    handleCategory(event) {
        this.setState({category: event.target.value});
        console.log(this.state.category);
    }

    // Add to Cart
    handleAddToCart(selectedProducts) {
        let cartItem = this.state.cart;
        let productID = selectedProducts.id;
        let productQty = selectedProducts.qty;
        console.log(productID + ":::" + productQty)
        if (this.checkProduct(productID)) {
            console.log("hi");
            let index = cartItem.findIndex(x => x.id == productID);
            console.log("index", index, cartItem[index].qty);
            cartItem[index].qty =
                Number(cartItem[index].qty) + Number(productQty);
            this.setState({
                cart: cartItem
            });
        } else {
            cartItem.push(selectedProducts);
        }
        this.setState({
            cart: cartItem,
            cartBounce: true
        });
        setTimeout(
            function () {
                this.setState({
                    cartBounce: false,
                    quantity: 0
                });
                console.log(this.state.quantity);
                console.log(this.state.cart);
            }.bind(this),
            1000
        );
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
    }

    // Add to Cart
    addOne(selectedProducts) {
        let cartItem = this.state.cart;
        let productID = selectedProducts.id;
        let productQty = selectedProducts.qty;
        console.log(productID + ":::" + productQty)
        if (this.checkProduct(productID)) {
            console.log("hi");
            let index = cartItem.findIndex(x => x.id == productID);
            console.log("index", index, cartItem[index].qty);
            cartItem[index].qty =
                Number(cartItem[index].qty) + 1;
            this.setState({
                cart: cartItem
            });
        } else {
            cartItem.push(selectedProducts);
        }
        this.setState({
            cart: cartItem,
            cartBounce: true
        });
        setTimeout(
            function () {
                this.setState({
                    cartBounce: false,
                    quantity: 0
                });
                console.log(this.state.quantity);
                console.log(this.state.cart);
            }.bind(this),
            1000
        );
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
    }


    // Add to Cart
    deleteOne(selectedProducts) {
        let cartItem = this.state.cart;
        let productID = selectedProducts.id;
        let productQty = selectedProducts.qty;
        console.log(productID + ":::" + productQty)
        if (this.checkProduct(productID)) {
            console.log("hi");
            let index = cartItem.findIndex(x => x.id == productID);
            console.log("index", index, cartItem[index].qty);
            cartItem[index].qty =
                Number(cartItem[index].qty) - 1;
            this.setState({
                cart: cartItem
            });
        } else {
            cartItem.push(selectedProducts);
        }
        this.setState({
            cart: cartItem,
            cartBounce: true
        });
        setTimeout(
            function () {
                this.setState({
                    cartBounce: false,
                    quantity: 0
                });
                console.log(this.state.quantity);
                console.log(this.state.cart);
            }.bind(this),
            1000
        );
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
    }

    handleRemoveProduct(id, e) {
        let cart = this.state.cart;
        let index = cart.findIndex(x => x.id == id);
        cart.splice(index, 1);
        this.setState({
            cart: cart
        });
        this.sumTotalItems(this.state.cart);
        this.sumTotalAmount(this.state.cart);
        e.preventDefault();
    }

    checkProduct(productID) {
        let cart = this.state.cart;
        return cart.some(function (item) {
            return item.id === productID;
        });
    }

    sumTotalItems() {
        let total = 0;
        let cart = this.state.cart;
        total = cart.length;
        this.setState({
            totalItems: total
        });
    }

    sumTotalAmount() {
        let total = 0;
        let cart = this.state.cart;
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].price * parseInt(cart[i].qty);
        }
        this.setState({
            totalAmount: total
        });
    }

    //Reset Quantity
    updateQuantity(qty) {
        console.log("quantity added...");
        this.setState({
            quantity: qty
        });
    }

    // Open Modal
    openModal(product) {
        this.setState({
            quickViewProduct: product,
            modalActive: true
        });
    }

    // Close Modal
    closeModal() {
        this.setState({
            modalActive: false
        });
    }

    handleUpdate(selectedProducts) {
        console.log("edit")
    }

    handleDelete(selectedProducts) {
        console.log("delete")
    }

    render() {
        let header = <Header
            cartBounce={this.state.cartBounce}
            total={this.state.totalAmount}
            totalItems={this.state.totalItems}
            cartItems={this.state.cart}
            removeProduct={this.handleRemoveProduct}
            handleSearch={this.handleSearch}
            handleSearchBySku={this.handleSearchBySku}
            handleSearchByStoreId={this.handleSearchByStoreId}
            handleMobileSearch={this.handleMobileSearch}
            handleCategory={this.handleCategory}
            categoryTerm={this.state.category}
            updateQuantity={this.updateQuantity}
            productQuantity={this.state.moq}
            addOne={this.addOne}
            deleteOne={this.deleteOne}
            getAll={this.getAll}
            {...this.state}
        />

        return (
            <div className="container">
                {header}
                <Products
                    productsList={this.state.products}
                    searchTerm={this.state.term}
                    addToCart={this.handleAddToCart}
                    productQuantity={this.state.quantity}
                    updateQuantity={this.updateQuantity}
                    getAll={this.getAll}
                    openModal={this.openModal}
                    flag={this.state.flag}
                />
                {/* <Footer /> */}
                {/* <QuickView
              product={this.state.quickViewProduct}
              openModal={this.state.modalActive}
              closeModal={this.closeModal}
            /> */}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminItems);