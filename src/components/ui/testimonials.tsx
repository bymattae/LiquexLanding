export default function Testimonials() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl">
          <blockquote>
            <p className="text-4xl font-medium leading-tight tracking-tight text-white lg:text-5xl">
              Liquex gave us full visibility across our IB network. We can spot churn early, take action instantly, and retain more traders. Our IBs have seen a 43% increase in client book value on average.
            </p>

            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center">
              <img
                className="h-6 w-fit"
                src="/VantageNew.png"
                alt="Vantage Logo"
                height="24"
                width="auto"
              />

              <div className="h-px w-16 bg-border md:h-12 md:w-px" />

              <div>
                <cite className="text-xl font-semibold not-italic text-white">Owen</cite>
                <span className="text-muted-foreground mt-1 block text-xl">Senior, Vantage</span>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
