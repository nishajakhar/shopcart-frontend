import { useGetProductsQuery } from '../slices/product/productApiSlice'
import ProductFeed from '../components/ProductFeed'
import Sidebar from '../components/Sidebar'

const ProductsListScreen = () => {
    const { data, isLoading, isError, error } = useGetProductsQuery(
        'productsList',
        {
            pollingInterval: 15000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        }
    )

    if (isLoading) return <p>Loading...</p>

    if (isError) {
        return <p className="errmsg">{error?.data?.message}</p>
    }
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-10/12 mx-auto p-5">
                <ProductFeed products={Object.values(data.entities)} />
            </div>
        </div>
    )
}

export default ProductsListScreen
