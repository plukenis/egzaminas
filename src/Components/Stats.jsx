function Stats({ stats }) {

    return (
        <div>
            <div className='statistic-results'>
                <span>book count: <i>{stats.count}</i></span>
                <span>average book price: <i>{stats.average.toPrecision(3)}</i>€</span>
            </div>


        </div>
    )
}
export default Stats;