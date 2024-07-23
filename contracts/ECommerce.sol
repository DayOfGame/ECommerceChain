import "hardhat/console.sol";

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ECommerceChain {
    address payable owner;

    enum OrderStatus { Placed, Confirmed, Shipped, Received }

    struct Product {
        uint id;
        string name;
        uint price;
        address payable seller;
    }

    struct Order {
        uint id;
        uint productId;
        address payable buyer;
        OrderStatus status;
    }

    mapping(uint => Product) public products;
    mapping(uint => Order) public orders;

    uint public nextProductId;
    uint public nextOrderId;

    event ProductAdded(uint productId, string name, uint price);
    event OrderPlaced(uint orderId, uint productId, address buyer);
    event OrderConfirmed(uint orderId, address seller);
    event OrderShipped(uint orderId);
    event OrderReceived(uint orderId);
    event OrderDetails(uint orderId, uint productId, OrderStatus status);

    constructor() {
        owner = payable(msg.sender);
        console.log("Contract deployed by: ", owner);
    }
}