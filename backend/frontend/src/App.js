import './App.css';
import { useState, useEffect} from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';

function App() {

  const[articles, setArticles] = useState([])
  const[editedArticle, setEditedArticles] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get', {
      'method':'GET',
      headers: {
        'Content-Type':'aplications/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
   
  },[])

  const editArticle = (article) => {
    setEditedArticles(article)
  }

  const updatedData = (article) => {
    const new_article = articles.map(my_article => {
      if (my_article.id === article.id) {
        return article
      } else {
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm = () => {
    setEditedArticles({title:'', body:''})
  }

  const insertArticle = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteArticle = (article) => {
    const new_articles = articles.filter(myarticle => {
      if(myarticle.id === article.id){
        return false;
      }
      return true
    })

    setArticles(new_articles)

  }

  return (
    <div className="App">
      <div className = "row">
        <div className="col">
          <h1>Flask and ReactJS</h1>
        </div>
        
        <div className='col'>
          <button
          className = "btn btn-success"
          onClick={openForm}
          >Insert Article</button>
      </div>
    </div>

        <ArticleList articles = {articles} editArticle = {editArticle} deleteArticle = {deleteArticle}/>

        {editedArticle ? <Form article = {editedArticle} updatedData = {updatedData} insertArticle = {insertArticle} /> : null}

    </div>
  );
}

export default App;
