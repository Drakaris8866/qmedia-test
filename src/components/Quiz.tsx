import React from "react";
import { TextContent } from "./TextContent";
import { Container } from "./Container";
import { Button } from "./Button";
import ProductsService from "../services/Products.service";
import { IProduct } from "./../types/products.types";

export const Quiz = () => {
  const [current, setCurrent] = React.useState(1);
  const [products, setProducts] = React.useState<null | IProduct[]>(null);
  const [loading, setLoading] = React.useState(false);

  let currentQ;

  switch (current) {
    case 1:
      currentQ = (
        <div className="quiz-question">
          <p className="quiz-question-title">Сколько вам лет?</p>
          <div className="quiz-question-item">
            <input
              type="radio"
              id="1"
              name="q1"
              value="Нужны средства для ребёнка младше 10 лет"
            />
            <label className="quiz-question-item-label" htmlFor="1">
              Нужны средства для ребёнка младше 10 лет
            </label>
          </div>

          <div className="quiz-question-item">
            <input type="radio" id="2" name="q1" value="Мне меньше 25 лет" />
            <label className="quiz-question-item-label" htmlFor="2">
              Мне меньше 25 лет
            </label>
          </div>

          <div className="quiz-question-item">
            <input type="radio" id="3" name="q1" value="От 25 до 35 лет" />
            <label className="quiz-question-item-label" htmlFor="3">
              От 25 до 35 лет
            </label>
          </div>
          <div className="quiz-question-item">
            <input type="radio" id="4" name="q1" value="От 35 до 45 лет" />
            <label className="quiz-question-item-label" htmlFor="4">
              От 35 до 45 лет
            </label>
          </div>
          <div className="quiz-question-item">
            <input type="radio" id="5" name="q1" value="Мне больше 45 лет" />
            <label className="quiz-question-item-label" htmlFor="5">
              Мне больше 45 лет
            </label>
          </div>
        </div>
      );
      break;

    case 2:
      currentQ = (
        <div className="quiz-question">
          <p className="quiz-question-title">Какой у вас тип кожи?</p>
          <div>
            <input type="radio" id="7" name="q2" value="Сухая" />
            <label htmlFor="7">Сухая</label>
          </div>

          <div>
            <input type="radio" id="8" name="q2" value="Нормальная" />
            <label htmlFor="8">Нормальная</label>
          </div>

          <div>
            <input type="radio" id="9" name="q2" value="Комбинированная" />
            <label htmlFor="9">Комбинированная</label>
          </div>
          <div>
            <input type="radio" id="10" name="q2" value="Жирная" />
            <label htmlFor="10">Жирная</label>
          </div>
        </div>
      );
      break;
    case 3:
      currentQ = (
        <div className="quiz-question">
          <p className="quiz-question-title">
            Беспокоят ли воспаления на лице?
          </p>
          <div>
            <input type="radio" id="11" name="q3" value="Да" />
            <label htmlFor="11">Да</label>
          </div>

          <div>
            <input type="radio" id="22" name="q3" value="Нет" />
            <label htmlFor="12">Нет</label>
          </div>

          <div>
            <input type="radio" id="13" name="q3" value="Иногда" />
            <label htmlFor="13">Иногда</label>
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  async function fetchproducts() {
    setLoading((prev) => !prev);
    const productsFromDb = await ProductsService.getProducts();
    setProducts(productsFromDb);
    setLoading((prev) => !prev);
  }

  return (
    <div>
      <Container>
        {current === 4 ? (
          <div className="quiz-result">
            <h1 className="text-content-h1">Результат</h1>
            <h2 className="text-content-h2">
              Пройдите короткий тест и получите список наиболее подходящих для
              вас косметических продуктов
            </h2>
            <div className="quiz-result-items">
              {products?.map((produt) => (
                <div className="quiz-result-content">
                  <svg
                    className="quiz-result-content-fav-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="28"
                    viewBox="0 0 32 28"
                    fill="none"
                  >
                    <path
                      d="M27.7867 4.14666C27.1057 3.46533 26.2971 2.92485 25.4071 2.5561C24.5172 2.18735 23.5633 1.99756 22.6 1.99756C21.6367 1.99756 20.6828 2.18735 19.7929 2.5561C18.9029 2.92485 18.0943 3.46533 17.4133 4.14666L16 5.55999L14.5867 4.14666C13.2111 2.77107 11.3454 1.99827 9.4 1.99827C7.45462 1.99827 5.58892 2.77107 4.21333 4.14666C2.83774 5.52225 2.06494 7.38795 2.06494 9.33332C2.06494 11.2787 2.83774 13.1444 4.21333 14.52L5.62666 15.9333L16 26.3067L26.3733 15.9333L27.7867 14.52C28.468 13.839 29.0085 13.0304 29.3772 12.1405C29.746 11.2505 29.9358 10.2966 29.9358 9.33332C29.9358 8.37001 29.746 7.41613 29.3772 6.52618C29.0085 5.63624 28.468 4.82767 27.7867 4.14666Z"
                      stroke="#D2D2D2"
                      stroke-width="2.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <img
                    className="quiz-result-content-img"
                    src={produt.image}
                  ></img>
                  <p className="quiz-result-content-title">{produt.title}</p>
                  <div className="quiz-result-content-prices">
                    {produt.oldPrice && (
                      <span className="quiz-result-content-prices-old">
                        {produt.oldPrice}
                      </span>
                    )}

                    <span className="quiz-result-content-prices-current">
                      {produt.price} руб.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {" "}
            <TextContent></TextContent>
            <div className="quiz-bg">
              <div className="quiz-questions-radio">
                <div className="quiz-questions-radio-btns">
                  <input
                    onChange={() => setCurrent(1)}
                    name="drone"
                    type="radio"
                    checked={current === 1}
                  ></input>
                  <input
                    onChange={() => setCurrent(2)}
                    name="drone"
                    type="radio"
                    checked={current === 2}
                  ></input>
                  <input
                    onChange={() => setCurrent(3)}
                    name="drone"
                    type="radio"
                    checked={current === 3}
                  ></input>
                </div>

                <div className="quiz-questions-text">
                  <span>Вопрос {current} из 3</span>
                </div>
              </div>
              <div>{currentQ}</div>
              <div className="quiz-btns">
                {current > 1 && (
                  <Button
                    onClick={() => setCurrent((prev) => prev - 1)}
                    outlined
                  >
                    Назад
                  </Button>
                )}
                {current !== 3 && (
                  <Button onClick={() => setCurrent((prev) => prev + 1)}>
                    Дальше
                  </Button>
                )}

                {current === 3 && (
                  <Button
                    onClick={() => {
                      fetchproducts();
                      setCurrent((prev) => prev + 1);
                    }}
                  >
                    Узнать результат
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};
