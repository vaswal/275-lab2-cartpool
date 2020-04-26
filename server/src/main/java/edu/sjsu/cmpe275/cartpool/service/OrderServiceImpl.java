package edu.sjsu.cmpe275.cartpool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import edu.sjsu.cmpe275.cartpool.pojos.Pooler;
import edu.sjsu.cmpe275.cartpool.pojos.Store;
import edu.sjsu.cmpe275.cartpool.exceptions.StoreNotFoundException;
import edu.sjsu.cmpe275.cartpool.exceptions.UserNotFoundException;
import edu.sjsu.cmpe275.cartpool.pojos.Orders;
import edu.sjsu.cmpe275.cartpool.repository.OrderRepository;
import edu.sjsu.cmpe275.cartpool.repository.PoolerRepository;
import edu.sjsu.cmpe275.cartpool.repository.StoreRepository;

import java.util.*;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	OrderRepository<Orders> orderRepository;
	@Autowired
	PoolerRepository<Pooler> poolerRepository;
	@Autowired
    StoreRepository<Pooler> storeRepository;
	@Override
	public Orders createOrder(Orders order, String deliveryPersonId, String ownerId, long storeId) {
		Pooler deliveryPerson= poolerRepository.findByEmail(deliveryPersonId); //.orElseThrow(() -> new UserNotFoundException());
		Pooler owner= poolerRepository.findByEmail(ownerId);//.orElseThrow(() -> new UserNotFoundException());
		Store store = storeRepository.findById(storeId).orElseThrow(() -> new UserNotFoundException());
		order.setDeliveryBy(deliveryPerson);
		order.setOrderOwner(owner);
		order.setStore(store);
		return orderRepository.save(order);
	}
}
