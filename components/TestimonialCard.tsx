import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  featured?: boolean;
  className?: string;
}

export default function TestimonialCard({ testimonial, featured, className }: TestimonialCardProps) {
  const cls = [featured ? "testi testi--featured" : "testi", className].filter(Boolean).join(" ");
  return (
    <article className={cls}>
      <p className="testi__tag">
        <span className="sq" aria-hidden="true"></span>
        {testimonial.tag}
      </p>
      <p className="testi__headline">&ldquo;{testimonial.headline}&rdquo;</p>
      <p className="testi__body">{testimonial.body}</p>
      <footer className="testi__meta">
        <span className="testi__name">{testimonial.name}</span>
        <span className="testi__role">{testimonial.role}, {testimonial.company}</span>
      </footer>
    </article>
  );
}
