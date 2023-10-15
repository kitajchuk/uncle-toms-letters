import type { Page, Language } from "../types";

import { useState, useRef } from "react";
import classNames from "classnames";
import { nanoid } from "nanoid";

import Image from "./image";

type LanguageProps = {
  text: string;
  active: boolean;
  onClick: () => void;
};

type TranslationProps = {
  id: string;
  page: Page;
};

enum LanguageMap {
  english = "german",
  german = "english",
}

const LangButton = ({ text, active, onClick }: LanguageProps) => {
  const classes = `text-sm font-normal leading-normal mx-1 border border-black px-2.5 py-0 rounded${
    active ? " bg-black text-white" : ""
  }`;

  return (
    <button type="button" onClick={onClick} className={classes}>
      {text}
    </button>
  );
};

const Translation = ({ id, page }: TranslationProps) => {
  const prioRef = useRef(false);
  const [language, setLanguage] = useState<Language>("english");

  const onClickLang = () => {
    setLanguage(LanguageMap[language]);
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
        <LangButton
          text="English"
          active={language === "english"}
          onClick={onClickLang}
        />
        <LangButton
          text="German"
          active={language === "german"}
          onClick={onClickLang}
        />
      </div>
      <div>{renderText(page[language])}</div>
      {page.documents ? (
        page.documents.map((doc) => {
          return (
            <div key={doc.src} className="mt-10">
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
