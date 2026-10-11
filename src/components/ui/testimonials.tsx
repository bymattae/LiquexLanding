export default function Testimonials() {
  return (
    <section className="px-6 py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <blockquote>
            <p className="text-balance text-3xl font-medium leading-tight tracking-tight text-white lg:text-4xl">
              Liquex gave us full visibility across our IB network. We can spot churn early, take action instantly, and retain more traders. Our IBs have seen a 43% increase in client book value on average.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3">
              <img
                className="h-6 w-fit"
                src="/VantageNew.png"
                alt="Vantage Logo"
                height="24"
                width="auto"
              />

              
              <div>
                <cite className="text-base font-semibold not-italic text-white">Owen</cite>
                <span className="text-muted-foreground mt-0.5 block text-sm">Senior, Vantage</span>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
