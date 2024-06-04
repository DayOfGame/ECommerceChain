from flask import Flask, request, jsonify
from flask_restful import Resource, Api
import os

app = Flask(__name__)
api = Api(app)

class PlaceOrder(Resource):
    def post(self):
        data = request.get_json()
        return {"message": "Order placed successfully", "data": data}, 201

class UpdateOrder(Resource):
    def put(self, order_id):
        data = request.get_json()
        return {"message": "Order updated successfully", "order_url": 201": ", "data": data}, 200

class GetOrderStatus(Resource):
    def get(self, order_id):
        return {"order_id": order_id, "status": "Processing"}, 200

api.add_resource(PlaceOrder, '/order')
api.add_resource(UpdateOrder, '/order/<order_id>')
api.add_resource(GetOrderStatus, '/order/status/<order_id>')

if __name__ == '__main__':
    app.run(debug=os.environ.get('DEBUG', False), host=os.environ.get('HOST', '0.0.0.0'), port=int(os.environ.get('PORT', 5000)))