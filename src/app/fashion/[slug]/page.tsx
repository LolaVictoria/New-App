"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../../../components/navbar";
import UseFetch from "../../../Hooks/useFetch"
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
  articles: Article[];
}
export default function Page  ({params}: { params: {slug: string}} ) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true);
  const query = "Fashion"
  const router = useRouter();
  const pageNumber = parseInt(params.slug)
  const TOP_HEADLINES_URL = `https://newsapi.org/v2/everything?q=${query}}&pageSize=6&from=2024-01-30&sortBy=relevancy&page=${pageNumber}&apikey=${process.env.NEXT_PUBLIC_NEWS_KEY}`
  // const TOP_HEADLINES_URL = `https://newsapi.org/v2/everything?q=pageant&pageSize=6&from=2024-01-30&sortBy=popularity&page=${pageNumber}&apikey=${process.env.NEXT_PUBLIC_NEWS_KEY}
  // const TOP_HEADLINES_URL = `https://newsapi.org/v2/top-headline&country=ng&pageSize=6&page=${pageNumber}`
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
    <div className="">
      <Navbar />
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 mx-5 mt-8 ">
        {articles.map((article, index) => (
          <div
            key={index}
            className=" rounded-md p-2"
            onClick={() => (window.location.href = article.url)}
          >
            <h1 className="font-bold text-md my-4">{article.title}</h1>
            <div className="flex items-start">
           <div className="flex flex-col ">

            <p className="font-medium text-sm">{article.description}</p>
            
            <p className="font-semibold">{query} {" "} &bull; {article.author}</p>
            
           </div>
            <div className="">
            {article.urlToImage && <Image 
            src={article.urlToImage} alt={article.title} width={300} height={350}
            className="rounded-lg" />} 
            </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center">
        <div
          className={pageNumber === 1 ? "m-4" : "m-4"}
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/feed/${pageNumber - 1}`)
              window.scrollTo(0, 0);
            }
          }}
        >
          &larr; Prev
        </div>

        <div>Page {pageNumber}</div>

        <div
          className={pageNumber === 1 ? "m-4" : "m-4"}
          onClick={() => {
            if (pageNumber < 5) {
              router.push(`/feed/${pageNumber + 1}`)
               window.scrollTo(0, 0);
            }
          }}
        >
          Next &rarr;
        </div>
      </div>
    </div>
  );
};