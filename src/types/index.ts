import type { ISizeCalculationResult } from "image-size/dist/types/interface.d.ts";

// Raw data types from static post files
export interface RawPage {
  title: string;
  german: string[];
  english: string[];
  document?: string;
  documents?: string[]; // Legacy...
}

export interface RawPost {
  pages: RawPage[];
  recent?: boolean;
  attachments: string[];
}

export interface RawData {
  id: string;
  pages: RawPage[];
  recent?: boolean;
  letters: string[];
  documents: string[];
  attachments: string[];
}

export interface RawEntity {
  title: string;
  offset: number;
  length: number;
  chunk: string;
  splitChunks: string[];
}

export interface RawLang {
  german: string[];
  english: string[];
}

// Data types from post SSG scripts
// These are for the client-side application
export type Orientation = "landscape" | "portrait";

export type Language = "german" | "english";

export interface Asset {
  alt: string;
  src: string;
  dims: ISizeCalculationResult;
  aspect: number;
  orientation: Orientation;
}

export interface Page {
  title: string;
  german: string[];
  english: string[];
  document?: Asset;
  documents?: Asset[]; // Legacy...
}

export interface BasePost {
  id: string;
  date: string;
  recent: boolean;
  documents: number;
  translations: number;
}

export interface Post extends BasePost {
  pages: Page[];
  attachments: Asset[];
}

// Data types for SSG async functions
export interface StaticParams {
  id: string;
}

export interface ParamsProps {
  params: StaticParams;
}

// Data types for client-side component props
export type PostProps = {
  post: Post;
  posts?: BasePost[];
};

export type TimelineProps = {
  posts: BasePost[];
};
