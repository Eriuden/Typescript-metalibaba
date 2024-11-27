import { useEffect } from "react";
import { getArticle } from "../redux/actions/article.actions";
import { useDispatch, useSelector } from "react-redux";
import { Comments } from "../components/comments/Comments";

export const ArticlePage = () => {
    const article = useSelector((state: any) => state.articleReducer)
    const dispatch = useDispatch()
  
    useEffect(()=> {
      dispatch(getArticle(article._id))
    })
  
    return (
      <div>
        <h2>{article.name}</h2>
        <img src={article.picture}/>
        <h3>{article.typeArticle}</h3>
        <h3>{article.groupe}</h3>
        <h3>{article.price}</h3>
  
        <div>
          <Comments commentProps={article}/>
        </div>
      </div>
    )
  }
  
}
