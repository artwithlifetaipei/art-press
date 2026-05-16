import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ArticleClient from "./ArticleClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getArticle(slug: string) {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single();
  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return {};

  const title = `${article.title} | ART PRESS Asia`;
  const description = article.subtitle || (Array.isArray(article.content) ? article.content.find((b: any) => b.type === 'text' || b.type === 'paragraph')?.content?.substring(0, 160) : '');
  const url = `https://theartpressasia.com/magazine/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: article.created_at,
      images: article.image ? [{ url: article.image }] : [],
    },
  };
}

export default async function MagazineArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) return notFound();

  return <ArticleClient article={article} />;
}
