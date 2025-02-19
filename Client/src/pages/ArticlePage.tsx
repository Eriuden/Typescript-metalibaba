import { useEffect } from "react";
import { getArticle } from "../redux/actions/article.actions";
import { useDispatch, useSelector } from "react-redux";
import { Comments } from "../components/comments/Comments";

export const ArticlePage = () => {
    type appDispatch = () => any
    const article = useSelector((state: any) => state.articleReducer)
    const useAppDispatch = () => useDispatch<appDispatch>()
    const dispatch = useAppDispatch()
  
    useEffect(()=> {
      getArticle(article._id, dispatch)
    })
  
    return (
      <div>
        <h2>{article.name}</h2>
        <img src={article.picture}/>
        <h3>{article.typeArticle}</h3>
        <h3>{article.groupe}</h3>
        <h3>{article.price}</h3>

        <div>
          <span>{article.likers}</span>
          <span>{article.dislikers}</span>
        </div>
  
        <div>
          <Comments commentProps={article}/>
        </div>
      </div>
    )
  }
  

