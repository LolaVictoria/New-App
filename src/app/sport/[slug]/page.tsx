"use client"

import Navbar from "../../../components/navbar";
import ArticleLayout from "@/components/articleLayout";


export default function Page  ({params}: { params: {slug: string}} ) {

  const query = "sport";
  const pageNumber = parseInt(params.slug);
  
  return (
  <>
      <Navbar />
      <ArticleLayout pageNumber={pageNumber} query={query}/>
      
    </>
  );
};