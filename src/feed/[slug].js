import Image from "next/image";
import { useRouter } from "next/navigation"
import Toolbar from "../../components/toolbar"
 
const Feed = () => {
    const router= useRouter()
    return (
       <div className="">
        <Toolbar/>
        <div className="">
            {articles.map((article, index) => (
               <div 
                  key={index} 
                  className=""
                  onClick={() => (window.location.href = article.url)}>
                  <h1>{article.title}</h1>

                  <p>{article.description}</p>
                  {!article.urlToImage && <Image src={article.urlToImage} alt={article.title}/>}
               </div>
            ))}
        </div>
         
         {/* Pagination */}
         <div className="flex justify-center">
        <div 
          className={pageNumber === 1 ? "m-4"   : "m-4" }
          onClick={() => {
          if (pageNumber > 1) {
             router.push(`/feed/${pageNumber - 1}`).then(() => window.scrollTo(0, 0))
          }
          }}>
             Prev
        </div>

        <div>#{pageNumber}</div>

        <div 
          className={pageNumber === 1 ? "m-4"   : "m-4" }
          onClick={() => {
          if (pageNumber < 5) {
             router.push(`/feed/${pageNumber + 1}`).then(() => window.scrollTo(0, 0))
          }
          }}>
             Next
        </div>



        </div>
       </div>
    )
}

export const gerServerSideProps = async PageContent => {
    const pageNumber =  pageContext.query.slug

    if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
        return {
            props: {
                articles: [],
                pageNumber: 1
            }
        }
    }

    const apiResponse = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page={pageNumber}`,
        {
            HEADERS: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}` 
            },
        }
    )

    const apiJson = await apiResponse.json();
   console.log(apiJson)

    const { articles } = apiJson;

    return {
        props: {
          articles,
          pageNumber: Number.parseInt(pageNumber)
    }
}
}
export default Feed;