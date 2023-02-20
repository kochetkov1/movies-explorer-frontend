import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <article className='project' id='project'>
      <h2 className='project__title'>О проекте</h2>
      <div className='project__container'>
        <div className='project__block'>
          <h3 className='project__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='project__paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='project__block'>
          <h3 className='project__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='project__paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='project__process'>
        <div className='project__process-section project__process-section_backend'>
          <p className='project__process-title project__process-title_backend'>
            1 неделя
          </p>
          <p className='project__process-subtitle'>Back-end</p>
        </div>
        <div className='project__process-section project__process-section_frontend'>
          <p className='project__process-title project__process-title_frontend'>
            4 недели
          </p>
          <p className='project__process-subtitle'>Front-end</p>
        </div>
      </div>
    </article>
  );
}

export default AboutProject;
