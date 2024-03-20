// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import UseFetch from "../Hooks/useFetch";
// import { useEffect, useState } from "react";

// interface Article {
//   title: string;
//   description: string;
//   url: string;
//   urlToImage: string;
//   author: string;
// }

// interface FeedProps {
//   pageNumber: number;
//   query: string;
// }

// const ArticleLayout: React.FC<FeedProps> = ({  pageNumber, query }) => {
//   const router = useRouter();
//   const [articles, setArticles] = useState<Article[]>([])
//   const [loading, setLoading] = useState(true);


//   const url = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=pasta&cuisine=italian&excludeCuisine=greek&diet=vegetarian&intolerances=gluten&equipment=pan&includeIngredients=tomato%2Ccheese&excludeIngredients=eggs&type=main%20course&instructionsRequired=true&fillIngredients=false&addRecipeInformation=false&titleMatch=Crock%20Pot&maxReadyTime=20&ignorePantry=true&sort=calories&sortDirection=asc&minCarbs=10&maxCarbs=100&minProtein=10&maxProtein=100&minCalories=50&maxCalories=800&minFat=10&maxFat=100&minAlcohol=0&maxAlcohol=100&minCaffeine=0&maxCaffeine=100&minCopper=0&maxCopper=100&minCalcium=0&maxCalcium=100&minCholine=0&maxCholine=100&minCholesterol=0&maxCholesterol=100&minFluoride=0&maxFluoride=100&minSaturatedFat=0&maxSaturatedFat=100&minVitaminA=0&maxVitaminA=100&minVitaminC=0&maxVitaminC=100&minVitaminD=0&maxVitaminD=100&minVitaminE=0&maxVitaminE=100&minVitaminK=0&maxVitaminK=100&minVitaminB1=0&maxVitaminB1=100&minVitaminB2=0&maxVitaminB2=100&minVitaminB5=0&maxVitaminB5=100&minVitaminB3=0&maxVitaminB3=100&minVitaminB6=0&maxVitaminB6=100&minVitaminB12=0&maxVitaminB12=100&minFiber=0&maxFiber=100&minFolate=0&maxFolate=100&minFolicAcid=0&maxFolicAcid=100&minIodine=0&maxIodine=100&minIron=0&maxIron=100&minMagnesium=0&maxMagnesium=100&minManganese=0&maxManganese=100&minPhosphorus=0&maxPhosphorus=100&minPotassium=0&maxPotassium=100&minSelenium=0&maxSelenium=100&minSodium=0&maxSodium=100&minSugar=0&maxSugar=100&minZinc=0&maxZinc=100&offset=0&number=10&limitLicense=false&ranking=2';
  
  
  
//   console.log(url)
//   useEffect(() => {
//     // Fetch data when the component mounts
//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': 'f5dc7e108bmshba69a6b3940eb9dp1accc3jsnb60543bda13e',
//         'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
//       }
//     };

//     const fetchData = async () => {
//       try {
//         const response = await fetch(url, options);
//         const result = await response.text();
//         console.log(result)
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         // Set loading to false whether the fetch was successful or not
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [url]);

//   return (
//     <div>
//     <div className="grid grid-cols-2 gap-x-10 gap-y-10 mx-5 mt-8">
//       {articles.map((article, index) => (
//         <div
//           key={index}
//           className="bg-white shadow-md rounded-md py-3 px-3"
//           onClick={() => (window.location.href = article.url)}
//         >
//           <h1 className="font-bold text-md mb-8">{article.title}</h1>
//           <div className="grid grid-cols-4 gap-x-1">
//             <div className="col-span-2 grid grid-rows-3">
//               <p className="font-medium text-sm row-span-2">{article.description}</p>
//               <p className="font-semibold row-span-1 align-text-bottom mt-2">
//                 {query.charAt(0).toUpperCase() + query.slice(1)} &bull; {article.author}
//               </p>
//             </div>
//             <div className="col-span-2">
//               {article.urlToImage && (
//                 <Image
//                   src={article.urlToImage}
//                   alt={article.title}
//                   width={300}
//                   height={350}
//                   loading="lazy"
//                   className="rounded-md object-cover"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//    </div>

//    {/*Pagination*/}
// <div className="flex justify-center items-center">
//         <div
//           className={pageNumber === 1 ? "m-4" : "m-4"}
//           onClick={() => {
//             if (pageNumber > 1) {
//               router.push(`/${query}/${pageNumber - 1}`)
//               window.scrollTo(0, 0);
//             }
//           }}
//         >
//           &larr; Prev
//         </div>

//         <div>Page {pageNumber}/5</div>

//         <div
//           className={pageNumber === 1 ? "m-4" : "m-4"}     
//           onClick={() => {
//             if (pageNumber < 5) {
//               router.push(`/${query}/${pageNumber + 1}`)
//                window.scrollTo(0, 0);
//             }
//           }}>
//           Next &rarr;
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ArticleLayout;

const axios = require('axios');

async function scrapeSite(keyword: string) {
	const url = `https://www.google.com/search?q=${keyword}&tbm=isch`;
	const { data } = await axios.get(url);
	return data
}

const keyword = "coffee"; // change with any keyword you want
scrapeSite(keyword).then(result => {
	console.log(result)
	}).catch(err => console.log(err));
