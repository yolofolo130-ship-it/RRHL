import PageHeader from "@/components/PageHeader";
import { newsPosts, type NewsPost } from "@/data/news";
import { formatLongDate } from "@/utils/format";

const sortedPosts = [...newsPosts].sort((a, b) => b.date.localeCompare(a.date));

function NewsPostCard({ post }: { post: NewsPost }) {
  return (
    <article className="border border-line bg-bg-2">
      {post.image && (
        <img src={post.image} alt="" className="h-64 w-full border-b border-line object-cover" />
      )}
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-ink-3">
          {formatLongDate(post.date).toUpperCase()}
        </p>
        <h2 className="font-display mt-2 text-2xl font-semibold uppercase tracking-wide text-ink-0 sm:text-3xl">
          {post.title}
        </h2>
        <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-1">{post.body}</p>
      </div>
    </article>
  );
}

export default function News() {
  return (
    <>
      <PageHeader eyebrow="AROUND THE LEAGUE" title="News" />

      <section className="mx-auto max-w-[800px] px-6 py-14 lg:px-10">
        {sortedPosts.length === 0 ? (
          <p className="border border-line bg-bg-2 px-6 py-14 text-center text-sm text-ink-2">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="flex flex-col gap-8">
            {sortedPosts.map((post) => (
              <NewsPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
