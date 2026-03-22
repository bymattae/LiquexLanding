export default function LogoCloud() {
  return (
    <section className="bg-background py-12 md:py-14">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-lg font-medium">Integrated with leading brokers</h2>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 items-center gap-4 sm:mt-12 sm:gap-10">
          <div className="flex items-center justify-center px-8 py-8">
            <img className="h-24 w-auto object-contain" src="/VTMARKETS.png" alt="VT Markets Logo" />
          </div>
          <div className="flex items-center justify-center px-8 py-8">
            <img className="h-14 w-auto object-contain" src="/vantage (1).png" alt="Vantage Logo" />
          </div>
          <div className="flex items-center justify-center px-8 py-8">
            <img className="h-24 w-auto object-contain" src="/PUPRIME.png" alt="PU Prime Logo" />
          </div>
        </div>
      </div>
    </section>
  )
}
