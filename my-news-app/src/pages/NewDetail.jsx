import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Header from '../components/Header';
import BottomBar from '../components/BottomBar';
import axios from 'axios';

function NewDetail() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get(`https://newsapi.org/v2/everything?q=${slug}`)
            .then(res => setArticle(res.data))
            .catch(err => console.error(err));
    }, [slug]);

    if (!article) return <p>Error 404</p>;

    return (
        <NewDetails article={article} />
    );
}

function NewDetails() {
  return (
    <div>
      <Header />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20" id="mainContent">
        <div id="newsDetailPage" class="hidden">
            <button onclick="goHome()" class="back-button flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium">
                ← Orqaga qaytish
            </button>
            
            <article class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <img id="newsDetailImage" src="" alt="" class="w-full h-64 md:h-96 object-cover"/>
                <div class="p-6 md:p-8">
                    <div class="flex items-center text-sm text-gray-500 mb-4">
                        <span id="newsDetailDate"></span>
                        <span class="mx-2">•</span>
                        <span id="newsDetailViews"></span>
                    </div>
                    <h1 id="newsDetailTitle" class="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight"></h1>
                    <div id="newsDetailContent" class="prose prose-lg max-w-none text-gray-700 leading-relaxed"></div>
                </div>
            </article>

            {/* <!-- Recommendations --> */}
            <section class="fade-in">
                <h3 class="text-2xl font-bold text-gray-900 mb-6">Tavsiya etiladigan yangiliklar</h3>
                <div id="recommendedNews" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* <!-- Recommended news will be inserted here --> */}
                </div>
            </section>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default NewDetail;
