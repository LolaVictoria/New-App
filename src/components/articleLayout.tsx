import Image from "next/image";
import { useRouter } from "next/navigation";
import UseFetch from "../Hooks/useFetch";
import { useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  author: string;
}

interface FeedProps {
  pageNumber: number;
  query: string;
}

const ArticleLayout: React.FC<FeedProps> = ({  pageNumber, query }) => {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true);

  const TOP_HEADLINES_URL = `https://newsapi.org/v2/everything?q=${query}}&pageSize=6&from=2024-01-30&sortBy=relevancy&page=${pageNumber}&apikey=${process.env.NEXT_PUBLIC_NEWS_KEY}`
  
  console.log(TOP_HEADLINES_URL)
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const data = await UseFetch(pageNumber, TOP_HEADLINES_URL);
        setArticles(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false whether the fetch was successful or not
        setLoading(false);
      }
    };
  
    fetchData();
  }, [pageNumber, TOP_HEADLINES_URL]);

  return (
    <div>
    <div className="grid grid-cols-2 gap-x-10 gap-y-10 mx-5 mt-8">
      {articles.map((article, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-md py-3 px-3"
          onClick={() => (window.location.href = article.url)}
        >
          <h1 className="font-bold text-md mb-8">{article.title}</h1>
          <div className="grid grid-cols-4 gap-x-1">
            <div className="col-span-2 grid grid-rows-3">
              <p className="font-medium text-sm row-span-2">{article.description}</p>
              <p className="font-semibold row-span-1 align-text-bottom mt-2">
                {query.charAt(0).toUpperCase() + query.slice(1)} &bull; {article.author}
              </p>
            </div>
            <div className="col-span-2">
              {article.urlToImage && (
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  width={300}
                  height={350}
                  loading="lazy"
                  className="rounded-md object-cover"
                />
              )}
            </div>
          </div>
        </div>
      ))}
   </div>

   {/*Pagination*/}
<div className="flex justify-center items-center">
        <div
          className={pageNumber === 1 ? "m-4" : "m-4"}
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/${query}/${pageNumber - 1}`)
              window.scrollTo(0, 0);
            }
          }}
        >
          &larr; Prev
        </div>

        <div>Page {pageNumber}/5</div>

        <div
          className={pageNumber === 1 ? "m-4" : "m-4"}     
          onClick={() => {
            if (pageNumber < 5) {
              router.push(`/${query}/${pageNumber + 1}`)
               window.scrollTo(0, 0);
            }
          }}>
          Next &rarr;
        </div>
      </div>
    </div>
  );
};

export default ArticleLayout;
