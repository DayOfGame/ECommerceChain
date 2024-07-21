pragma solidity ^0.8.0;

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
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function addProduct(string memory name, uint price) public onlyOwner {
        products[nextProductId] = Product(nextProductId, name, price, payable(msg.sender));
        emit ProductAdded(nextProductId, name, price);
        nextProductId++;
    }

    function placeOrder(uint productId) public payable {
        require(products[productId].price == msg.value, "Incorrect value sent");
        
        orders[nextOrderId] = Order(nextOrderId, productId, payable(msg.sender), OrderStatus.Placed);
        emit OrderPlaced(nextOrderId, productId, msg.sender);
        nextOrderId++;
    }

    function confirmOrder(uint orderId) public {
        require(orders[orderId].status == OrderStatus.Placed, "Order cannot be confirmed in current state");
        require(products[orders[orderId].productId].seller == msg.sender, "Only the seller can confirm the order");
        
        orders[orderId].status = OrderStatus.Confirmed;
        emit OrderConfirmed(orderId, msg.sender);
    }

    function shipOrder(uint orderId) public {
        require(orders[orderId].status == OrderStatus.Confirmed, "Order cannot be shipped in current state");
        require(products[orders[orderId].productId].seller == msg.sender, "Only the seller can ship the order");

        orders[orderId].status = OrderStatus.Shipped;
        emit OrderShipped(orderId);
    }

    function receiveOrder(uint orderId) public {
        require(orders[orderId].status == OrderStatus.Shipped, "Order cannot be received in current
state");
        require(orders[orderId].buyer == msg.sender, "Only the buyer can confirm order receipt");

        orders[orderId].status = OrderStatus.Received;
        emit OrderReceived(orderId);
    }

    function getOrderDetails(uint orderId) public view returns (uint, uint, OrderStatus) {
        require(orders[orderId].buyer == msg.sender || products[orders[orderId].productId].seller ==
msg.sender, "You are not authorized to view this order");
        
        Order memory order = orders[orderId];
        return (order.id, order.productId, order.status);
    }

    function withdrawFunds() public {
        uint amount = 0;
        for (uint i = 0; i < nextOrderId; i++) {
            if (products[orders[i].productId].seller == msg.sender && orders[i].status == OrderStatus.Received) {
                amount += products[orders[i].productId].price;
                orders[i].status = OrderStatus.Placed;
            }
        }

        require(amount > 0, "No funds to withdraw");
        payable(msg.sender).transfer(amount);
    }
}