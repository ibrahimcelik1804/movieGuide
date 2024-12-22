import React from "react";
import { useParams } from "react-router-dom";
import { useGetMovieReviewsQuery } from "../features/movies/movieApi";
import { FaFire } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";

const Comment: React.FC = () => {
  const { id } = useParams<{ id: string }>();

 
  const {
    data: reviewsData,
    isLoading,
    error,
  } = useGetMovieReviewsQuery(id ?? "");


  if (isLoading) {
    return <div>Yorumlar yükleniyor...</div>;
  }

  if (error) {
    return <div>Yorumları yüklerken bir hata oluştu.</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 ">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-2xl font-bold mb-4">Yorumlar</h1>

        {/* Yorum Formu */}
        <div className="flex gap-4 items-center border-b-2 pb-4">
          <div className="bg-red-600 text-white py-2 px-4 rounded-lg">
            {reviewsData?.total_results || "Yorum Yok"}
          </div>
          <textarea
            className="bg-gray-800 text-white p-2 rounded-lg w-full"
            placeholder="Yorum ekleyin..."
            rows={2}
          />
        </div>

        {/* Yorumlar Listesi */}
        <div className="space-y-6 mt-4">
          {reviewsData?.results?.map((review: any, index: number) => (
            <div key={index} className="flex flex-col md:flex-row gap-4">
              {/* Kullanıcı Resmi */}
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={
                    review.author_details?.avatar_path
                      ? `https://www.gravatar.com/avatar/${review.author_details?.avatar_path}`
                      : "/default_actor.png"
                  }
                  alt={review.author_details?.username}
                />
              </div>

              {/* Yorum İçeriği */}
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-start">
                  <p className="text-lg font-semibold text-white">
                    {review.author_details?.username}
                  </p>
                </div>
                <p className="text-gray-300 mt-2">{review.content}</p>

                {/* Yorumun Altındaki Butonlar */}
                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                    <FaFire />
                    <span>Beğen</span>
                  </button>
                  <button className="flex items-center gap-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                    <TiArrowBackOutline />
                    <span>Cevapla</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
