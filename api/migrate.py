from app.database import get_database
from pprint import pprint

# Get products associated with a protocol
def migrate(db):
    def extract_products():
        results = db.protocoles.aggregate([
            {
                '$unwind': {
                    'path': '$days.products',
                    'preserveNullAndEmptyArrays': True
                },
            },
            {
                '$project': {
                    'name': '$name',
                    'protocolId': '$_id',
                    'products': '$days.products'
                }
            },
            {
                '$unwind': {
                    'path': '$products',
                    'preserveNullAndEmptyArrays': True
                }
            }])

        products_protocol_id = [(e['products'], e['protocolId']) for e in results if 'products' in e]

        products_in_arrays = [e[0] for e in products_protocol_id]
        flat_products = [product for products in products_in_arrays for product in products]

        unique_products = list(set(flat_products))

        return unique_products

    def insert_products(products):
        ids = db.products.insert_many([{'name': p} for p in products])
        return ids

        
    products_from_products = db.products.find()
    pprint([p for p in products_from_products])
    def get_inserted_products():
        return db.products.find()

def make_query(db, product):
    res = db.protocoles.update_many(
            {'days.products': product['name']},
            {
                '$set': {
                    'days.$[].products.$[product]': { 'name': product['name'], 'productId': product['_id'] }
                }
            },
            array_filters=[{ 'product': product['name'] }]
            )
    pprint(res)

