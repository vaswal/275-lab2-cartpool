package edu.sjsu.cmpe275.cartpool.pojos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.util.Date;
import java.util.List;


@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    @XmlTransient
    @JsonIgnoreProperties({"admin", "orders", "products"})
    private Store store;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pool_id")
    @XmlTransient
    @JsonIgnoreProperties({"pool", "poolLeader", "members"})
    private Pool pool;

    @Column
    private long qty;

    @Column(precision = 10, scale = 2)
    private double price;

    @Column(precision = 10, scale = 2)
    private double finalPrice;

    @Column
    private boolean available;

    @Column
    private boolean forDelivery;

    @Column
    private String status;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"pool", "orders", "password", "is_verified", "accessToken", "provider", "provider_id", "verifiedForPoolMembership"})
    private Pooler orderOwner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pooler_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"pool", "orders", "store"})///// to be done
    private Pooler deliveryBy;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"pool", "orders", "store"})///// to be done
    private Pooler deliveryByPrev;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "order")
//    @JoinColumn(name = "order_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"order"})
    private List<OrderDetails> orderDetails;

    @Column
    private Date date = new Date();

    public Orders() {
    }

    protected Orders(OrderBuilder orderBuilder) {
        this.available = orderBuilder.available;
        this.qty = orderBuilder.qty;
        this.price = orderBuilder.price;
        this.finalPrice = orderBuilder.finalPrice;
        this.forDelivery = orderBuilder.forDelivery;
        this.status = orderBuilder.status;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    public Pool getPool() {
        return pool;
    }

    public void setPool(Pool pool) {
        this.pool = pool;
    }

    public long getQty() {
        return qty;
    }

    public void setQty(long qty) {
        this.qty = qty;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(double finalPrice) {
        this.finalPrice = finalPrice;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public boolean isForDelivery() {
        return forDelivery;
    }

    public void setForDelivery(boolean forDelivery) {
        this.forDelivery = forDelivery;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Pooler getOrderOwner() {
        return orderOwner;
    }

    public void setOrderOwner(Pooler orderOwner) {
        this.orderOwner = orderOwner;
    }

    public Pooler getDeliveryBy() {
        return deliveryBy;
    }

    public void setDeliveryBy(Pooler deliveryBy) {
        this.deliveryBy = deliveryBy;
    }

    public List<OrderDetails> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetails> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public Pooler getDeliveryByPrev() {
        return deliveryByPrev;
    }

    public void setDeliveryByPrev(Pooler deliveryByPrev) {
        this.deliveryByPrev = deliveryByPrev;
    }

    public static class OrderBuilder {
        private long store_id;
        private int qty;
        private double price;
        private double finalPrice;
        private boolean forDelivery;
        private boolean available;
        private String status;
        private Pooler orderOwner;

        public OrderBuilder store_id(long store_id) {
            this.store_id = store_id;
            return this;
        }

        public OrderBuilder qty(int qty) {
            this.qty = qty;
            return this;
        }

        public OrderBuilder price(double price) {
            this.price = price;
            return this;
        }

        public OrderBuilder finalPrice(double finalPrice) {
            this.finalPrice = finalPrice;
            return this;
        }

        public OrderBuilder forDelivery(boolean forDelivery) {
            this.forDelivery = forDelivery;
            return this;
        }


        public OrderBuilder available(boolean available) {
            this.available = available;
            return this;
        }


        public OrderBuilder status(String status) {
            this.status = status;
            return this;
        }

        public OrderBuilder orderOwner(Pooler orderOwner) {
            this.orderOwner = orderOwner;
            return this;
        }

        public Orders build() {
            return new Orders(this);
        }
    }
}
