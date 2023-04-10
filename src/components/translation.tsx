import type { Page } from "../types";

import { useState, useRef } from "react";
import classNames from "classnames";
import { nanoid } from "nanoid";

import Image from "./image";

type LanguageProps = {
  lang: string;
  handler?: () => void;
};

const ActiveLang = ({ lang }: LanguageProps) => {
  return (
    <div className="text-sm font-normal leading-normal mx-1 border border-black px-2.5 py-0 rounded bg-black text-white">
      {lang}
    </div>
  );
};

const InactiveLang = ({ lang, handler }: LanguageProps) => {
  return (
    <div
      className="text-sm font-normal leading-normal mx-1 border border-black px-2.5 py-0 rounded cursor-pointer"
      onClick={handler}
    >
      {lang}
    </div>
  );
};

type TranslationProps = {
  id: string;
  page: Page;
};

const Translation = ({ id, page }: TranslationProps) => {
  const prioRef = useRef(false);
  const [english, setEnglish] = useState(true);

  const onClickLang = () => {
    setEnglish(!english);
  };

  const renderText = (texts: string[]) => {
    return texts.map((text) => {
      const classes = {
        "my-4": true,
      };

      if (texts.length === 1 && texts[0].length < 90) {
        classes["text-center"] = true;
        prioRef.current = true;
      }

      if (Array.isArray(text)) {
        text = text.join("\n");
        classes["whitespace-pre-line"] = true;
        classes["leading-normal"] = true;
      }

      return (
        <p key={nanoid()} className={classNames(classes)}>
          {text}
        </p>
      );
    });
  };

  return (
    <section className="anim leading-loose pb-20 sm:pb-36">
      <div className="text-center text-xl sm:text-2xl">{page.title}</div>
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
      <div>{renderText(english ? page.english : page.german)}</div>
      {page.documents ? (
        page.documents.map((doc, i) => {
          return (
            <div key={id} className="mt-10">
              <Image
                src={doc.src}
                alt=""
                width={doc.dims.width}
                height={doc.dims.height}
                aspect={doc.aspect}
                orientation={doc.orientation}
              />
            </div>
          );
        })
      ) : (
        <div className="mt-10">
          <Image
            src={page.document.src}
            alt=""
            width={page.document.dims.width}
            height={page.document.dims.height}
            aspect={page.document.aspect}
            priority={prioRef.current}
            orientation={page.document.orientation}
          />
        </div>
      )}
    </section>
  );
};

export default Translation;
