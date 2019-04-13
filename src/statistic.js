import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import moment from 'moment';

import {ClassName, createElement} from './util';

import Component from './component';

const BAR_HEIGHT = 50;

export default class Stastic extends Component {
  constructor(films) {
    super();
    this._films = films;

    this._state = {
      chart: null,
      currentFilter: `all-time`,
    };

    this._filteredFilms = this._filterFilms();

    this._dateForm = null;

    this._onFormChange = this._onFormChange.bind(this);
  }

  get _genres() {
    return [...new Set(this._filteredFilms.reduce((genres, film) => [...genres, ...film.genres], []))];
  }

  get _genresData() {
    return this._genres.map((genre) => {
      return this._filteredFilms.reduce(((counter, film) => {
        return (film.genres.some((item) => item === genre) ? (counter + 1) : counter);
      }), 0);
    });
  }

  get _totalFilmsDuration() {
    return this._filteredFilms.reduce(((duration, film) => duration + film.duration), 0);
  }

  get _topGenre() {
    return this._genres[this._genresData.indexOf(Math.max(...this._genresData))];
  }

  get _chart() {
    const statisticCtx = this._element.querySelector(`.${ ClassName.STATISTIC.CHART }`);

    statisticCtx.height = BAR_HEIGHT * this._genres.length;

    return new Chart(statisticCtx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._genres,
        datasets: [{
          data: this._genresData,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 20
            },
            color: `#ffffff`,
            anchor: `start`,
            align: `start`,
            offset: 40,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 24
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        }
      }
    });
  }

  get _templateContent() {
    return `
      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${ this._state.currentFilter === `all-time` ? `checked` : `` }>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${this._state.currentFilter === `today` ? `checked` : `` }>
          <label for="statistic-today" class="statistic__filters-label">Today</label>
  
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${ this._state.currentFilter === `week` ? `checked` : `` }>
          <label for="statistic-week" class="statistic__filters-label">Week</label>
  
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${ this._state.currentFilter === `month` ? `checked` : `` }>
          <label for="statistic-month" class="statistic__filters-label">Month</label>
  
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${ this._state.currentFilter === `year` ? `checked` : `` }>
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>
  
        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text">${ this._filteredFilms.length }<span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${ Math.trunc(moment.duration(this._totalFilmsDuration, `minutes`).asHours()) } <span class="statistic__item-description">h</span> ${ moment.duration(this._totalFilmsDuration, `minutes`).minutes() } <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${ this._topGenre }</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>
    `.trim();
  }

  get _template() {
    return `
      <section class="statistic">
        ${ this._templateContent }
      </section>
    `.trim();
  }

  _filterFilms() {
    const today = new Date(Date.now());

    switch (this._state.currentFilter) {
      case `all-time`: {
        return this._films;
      }

      case `today`: {
        return this._films.filter(({watchingDate}) => moment(watchingDate).isSame(today, `day`));
      }

      case `week`: {
        return this._films.filter(({watchingDate}) => moment(watchingDate).isSameOrAfter(moment(today).subtract(1, `week`)));
      }

      case `month`: {
        return this._films.filter(({watchingDate}) => moment(watchingDate).isSameOrAfter(moment(today).subtract(1, `month`)));
      }

      case `year`: {
        return this._films.filter(({watchingDate}) => moment(watchingDate).isSameOrAfter(moment(today).subtract(1, `year`)));
      }

      default: {
        return null;
      }
    }
  }

  updateElement() {
    if (this._element) {
      this._removeEventListener();
      this._filteredFilms = this._filterFilms();
      this._element.innerHTML = this._templateContent;
      this._state.chart = this._chart;
      this._updateElementsVariables();
      this._addEventListener();
    }
  }

  update(films) {
    this._films = films;
    this._filteredFilms = this._filterFilms();
  }

  _getDateForm() {
    return this._element.querySelector(`.${ClassName.STATISTIC.FORM}`);
  }

  _onFormChange(evt) {
    evt.preventDefault();
    this._state.currentFilter = evt.target.value;
    this.updateElement();
  }

  _addEventListener() {
    this._dateForm.addEventListener(`change`, this._onFormChange);
  }

  _removeEventListener() {
    this._dateForm.removeEventListener(`change`, this._onFormChange);
  }

  _updateElementsVariables() {
    this._dateForm = this._getDateForm();
  }


  render() {
    this._element = createElement(this._template);
    this._updateElementsVariables();
    this._addEventListener();

    this._state.chart = this._chart;

    return this._element;
  }
}
