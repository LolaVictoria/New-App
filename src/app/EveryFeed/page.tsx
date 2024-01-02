"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar";
import UseFetch from "../../Hooks/useFetch"
import { useEffect, useState } from "react";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

interface FeedProps {
  pageNumber: number;
  articles: Article[];
}
export default function Page  ({params}: { params: {slug: string}} ) {
    const [query, setQuery] = useState("");
  const [dateTo, setDateTo] = useState("")
  const [dateFrom, setDateFrom] = useState("")
  const[language, setLanguage] = useState("en")
  const [sortBy, setSortBy] = useState("relevancy")
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pageNumber = parseInt(params.slug)
  const ALL_FEED_URL = `https://newsapi.org/v2/everything?q={query}&apiKey=${process.env.NEXT_PUBLIC_NEWS_KEY}&searchIn={title,description,content}&from={dateFrom}&to={dateTo}&language={language}&sortBy={sortBy}page=${pageNumber}`

  const countryLangList = ["ar", "de", "en", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "sv", "ud", "zh"]
  const sortedByOptions = ["relevancy", "popularity", "publishedAt"]
  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const data = await UseFetch(pageNumber, ALL_FEED_URL);
        console.log(data)
        setArticles(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false whether the fetch was successful or not
        setLoading(false);
      }
    };
  
    fetchData();
  }, [ALL_FEED_URL, pageNumber]);
  
  return (
    <div className="">
      <Navbar />
      <div className="flex justify-between items-center border mx-3 py-3 mt-5">
        <input
           placeholder="type something" 
           value={query} 
           onChange={(e) =>  setQuery(e.target.value)}
           className="focus: outline-none border-2 border-gray-400 px-3 py-2 rounded-sm"/>
          <button></button>
           
           <div className="flex gap-x-5">
           <div>
             <label>Start Date:</label>
             <input 
               type="date" name="startdate" required pattern="\d{4}-\d{2}-\d{2}"
               className="focus: outline-none border-2 border-gray-400 ml-2"/>
           </div>
           <div>
             <label>End Date:</label>
             <input 
              type="date" name="enddate" required pattern="\d{4}-\d{2}-\d{2}"
              className="focus: outline-none border-2 border-gray-400 ml-2"/>
           </div>
           </div>

           <div>
               <select 
                 value={language} onChange={(e) => setLanguage(e.target.value)}
                 className="focus: outline-none border-2 border-gray-400">
                    {countryLangList.map(country => 
                        <option key={country} value={country}>{country}</option>
                    )}
                </select> 
           </div>

           <div>
           <select 
             value={sortBy} onChange={(e) => setSortBy(e.target.value)}
             className="focus: outline-none border-2 border-gray-400">
                    {sortedByOptions.map(sorted => 
                        <option key={sorted} value={sorted}>{sorted}</option>
                    )}
                </select> 
           </div>


      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-5 mx-5 mt-8 ">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-gray-500 rounded-md p-2"
            onClick={() => (window.location.href = article.url)}
          >
            <h1 className="font-extrabold text-2xl my-4">{article.title}</h1>
            <p className="font-medium text-lg">{article.description}</p>
            <div className="mt-5 flex justify-center">
            {article.urlToImage && <Image src={article.urlToImage} alt={article.title} width={500} height={250} />} 
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

