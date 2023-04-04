import Product from './Product'

const ProductFeed = ({ products }) => {
    return (
        <div className="h-screen overflow-y-scroll grid grid-flow-row-dense md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:px-5 mx-auto">
            {products.map(
                ({ id, images, name, description, category, price }, index) => (
                    <Product
                        images={images}
                        price={price}
                        name={name}
                        id={id}
                        description={description}
                        category={category}
                        key={index}
                    />
                )
            )}
        </div>
    )
}

export default ProductFeed
