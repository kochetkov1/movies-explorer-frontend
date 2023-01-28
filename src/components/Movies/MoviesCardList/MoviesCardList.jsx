import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';
import image1 from '../../../images/card-image1.png';
import image2 from '../../../images/card-image2.png';

function MoviesCardList() {
  // Временное решение для демонстрации функциональности без API
  const cardName1 = '33 слова о дизайне';
  const cardName2 = 'Баския: Взрыв реальности';

  const [isContent, setIsContent] = React.useState(false);

  function toggleContent() {
    setIsContent(!isContent);
  }

  React.useEffect(() => {
    setTimeout(toggleContent, 2000);
  }, []);

  return (
    <article className='card-list'>
      {isContent ? (
        <>
          <ul className='card-list__items'>
            <MoviesCard image={image1} cardName={cardName1} />
            <MoviesCard image={image2} cardName={cardName2} saveStatus={true} />
            <MoviesCard
              image={image1}
              cardName={cardName1}
              deleteStatus={true}
            />
            <MoviesCard
              image={image2}
              cardName={cardName2}
              deleteStatus={true}
            />
            <MoviesCard image={image1} cardName={cardName1} />
            <MoviesCard image={image2} cardName={cardName2} saveStatus={true} />
            <MoviesCard image={image1} cardName={cardName1} saveStatus={true} />
            <MoviesCard image={image2} cardName={cardName2} />
            <MoviesCard image={image1} cardName={cardName1} saveStatus={true} />
            <MoviesCard image={image2} cardName={cardName2} />
            <MoviesCard image={image1} cardName={cardName1} />
            <MoviesCard image={image2} cardName={cardName2} />
          </ul>
          <button className='card-list__button animation'>Ещё</button>
        </>
      ) : (
        <Preloader />
      )}
    </article>
  );
}

export default MoviesCardList;
