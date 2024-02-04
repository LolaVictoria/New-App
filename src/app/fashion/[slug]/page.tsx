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
      <div className="grid grid-cols-2 gap-x-10 gap-y-10 mx-5 mt-8 ">
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
            
            <p className="font-semibold row-span-1 align-text-bottom mt-2">{query} {" "} &bull; {article.author}</p>
            
           </div>
            <div className="col-span-2">
            {article.urlToImage && <Image 
            src={article.urlToImage} alt={article.title} width={300} height={350}
            className="rounded-md object-cover" />} 
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
              router.push(`/fashion/${pageNumber - 1}`)
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
              router.push(`/fashion/${pageNumber + 1}`)
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