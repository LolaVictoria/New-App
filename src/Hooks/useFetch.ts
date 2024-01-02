

export default async function UseFetch(pageNumber: number, url: string) { 

    
  
    if (!pageNumber || Number.isNaN(+pageNumber) || +pageNumber < 1 || +pageNumber > 5) {
      return []
    }
  
    const apiResponse = await fetch(
      url,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
        },
      }
    );
  
    const apiJson = await apiResponse.json();
    console.log(apiJson);
  
  
    const { articles } = apiJson;
  
    return articles
  
  
  };
  
  
  