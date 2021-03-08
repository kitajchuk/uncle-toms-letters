import { useState } from 'react';
import AsyncImage from './asyncimage';

const ActiveLang = ({ lang }) => {
  return (
    <div className="text-sm font-normal leading-normal mx-1 border border-black text-white bg-black px-2.5 py-0 rounded">{lang}</div>
  );
};

const InactiveLang = ({ lang, handler }) => {
  return (
    <div className="text-sm font-normal leading-normal mx-1 border border-black bg-white px-2.5 py-0 rounded cursor-pointer" onClick={handler}>{lang}</div>
  );
};

const Translation = ({ id, data }) => {
  const [english, setEnglish] = useState(true);

  const onClickLang = (e) => {
    setEnglish(!english);
  };

  const renderText = (texts) => {
    return texts.map((text) => {
      return (
        <p className="my-4">{text}</p>
      );
    });
  };

  return (
    <section className="leading-loose pb-28 sm:pb-36">
      <div className="text-xl sm:text-2xl">{data.title}</div>
      <div className="mt-3 mb-5 -mx-1 flex items-center">
        {english ? (
          <>
            <ActiveLang lang="English" />
            <InactiveLang lang="German" handler={onClickLang} />
          </>
        ) : (
          <>
              <InactiveLang lang="English" handler={onClickLang} />
              <ActiveLang lang="German" />
          </>
        )}
      </div>
      <div>
        {english ? renderText(data.english) : renderText(data.german)}
      </div>
      <div className="mt-10">
        <AsyncImage src={`/posts/${id}/${data.document}`} />
      </div>
    </section>
  );
};

export default Translation;