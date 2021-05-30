import { useState } from 'react';
import classNames from 'classnames';
import { nanoid } from 'nanoid';

import AsyncImage from './asyncimage';
import { withAnimate } from './animate';

const ActiveLang = ({lang}) => {
  return <div className="text-sm font-normal leading-normal mx-1 border border-black px-2.5 py-0 rounded">{lang}</div>;
};

const InactiveLang = ({lang, handler}) => {
  return <div className="text-sm font-normal leading-normal mx-1 border border-white px-2.5 py-0 rounded cursor-pointer" onClick={handler}>{lang}</div>;
};

const Translation = ({id, data}) => {
  const [english, setEnglish] = useState(true);

  const onClickLang = () => {
    setEnglish(!english);
  };

  const renderText = (texts) => {
    return texts.map((text) => {
      const classes = {
        'my-4': true,
      };

      if (texts.length === 1 && texts[0].length < 90) {
        classes['text-center'] = true;
      }

      if (Array.isArray(text)) {
        text = text.join('\n');
        classes['whitespace-pre-line'] = true;
        classes['leading-normal'] = true;
      }

      return <p key={nanoid()} className={classNames(classes)}>{text}</p>;
    });
  };

  return (
    <section className="leading-loose pb-20 sm:pb-36">
      <div className="text-center text-xl sm:text-2xl">{data.title}</div>
      <div className="mt-3 mb-5 -mx-1 flex items-center justify-center">
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
        {renderText(english ? data.english : data.german)}
      </div>
      {data.documents ? data.documents.map((doc) => {
        return (
          <div key={id} className="mt-10">
            <AsyncImage src={`/assets/${id}/${doc}`} />
          </div>
        );
      }) : (
        <div className="mt-10">
          <AsyncImage src={`/assets/${id}/${data.document}`} />
        </div>
      )}
    </section>
  );
};

export default withAnimate(Translation);