import React, { useEffect, useState } from 'react';
import './App.scss';

type IAction = '❌' | '⭕';

interface IItem {
  id: number;
  isSelected: boolean;
  action: IAction | '';
}

const tmpItemsArr: IItem[] = Array.from({ length: 9 }).map((_, id) => ({
  id,
  isSelected: false,
  action: '',
}));

const itemsArr: Array<IItem[]> = [];

for (let i = 0; i < 9; i++) {
  if (!((i + 1) % 3)) {
    itemsArr.push(tmpItemsArr.splice(0, 3));
  }
}

const App: React.FC = () => {
  const [items, setItems] = useState<Array<IItem[]>>(itemsArr);
  const [action, setAction] = useState<IAction>('❌');
  const [count, setCount] = useState(0);

  const toggleAction = (id: number) => {
    setItems(prev => {
      return prev.map(arr => {
        return arr.map(item => {
          if (item.id === id && !item.isSelected) {
            setAction(prev => {
              return prev === '⭕' ? '❌' : '⭕';
            });
            setCount(prev => ++prev);

            return { ...item, isSelected: true, action };
          }

          return item;
        });
      });
    });
  };

  function resetItems() {
    setItems(prev => {
      return prev.map(arr => {
        return arr.map(item => ({
          ...item,
          isSelected: false,
          action: '',
        }));
      });
    });
  }

  function overGame() {
    resetItems();
    setCount(0);
    setAction('❌');
    alert('the game is over');
  }

  function checkArray(
    arr: IItem[],
  ): { isAllCrosses: boolean; isAllZeroes: boolean } {
    const isAllCrosses = arr.every(item => {
      return item.action === '❌';
    });
    const isAllZeroes = arr.every(item => {
      return item.action === '⭕';
    });

    return { isAllCrosses, isAllZeroes };
  }

  const checkRows = () => {
    for (const arr of items) {
      const { isAllCrosses, isAllZeroes } = checkArray(arr);

      if (isAllCrosses || isAllZeroes) {
        overGame();
        break;
      }
    }
  };

  const checkColumns = () => {
    for (let i = 0; i < items.length; i++) {
      const arr = [];

      for (let j = 0; j < items.length; j++) {
        arr.push(items[j][i]);
      }

      const { isAllCrosses, isAllZeroes } = checkArray(arr);

      if (isAllCrosses || isAllZeroes) {
        overGame();
        break;
      }
    }
  };

  const checkCrosses = (position: 'left' | 'right' = 'left') => {
    const arr = [];

    for (let i = 0; i < items.length; i++) {
      const itemIdx = position === 'left' ? i : items.length - 1 - i;
      arr.push(items[i][itemIdx]);
    }

    const { isAllCrosses, isAllZeroes } = checkArray(arr);

    if (isAllCrosses || isAllZeroes) {
      overGame();
    }
  };

  useEffect(() => {
    console.log(action);
    if (count >= 5) {
      checkRows();
      checkColumns();
      checkCrosses('left');
      checkCrosses('right');
    }

    if (count === items.length * items[0].length) {
      overGame();
      alert('draw');
    }
  }, [items]);

  return (
    <div className="wrapper">
      <main className="page">
        <section className="page__sc sc">
          <div className="sc__container _container">
            <div className="sc__body">
              <div className="sc__items">
                {items.map(arr => {
                  return arr.map(({ id, action }) => {
                    return (
                      <div
                        key={id}
                        onClick={() => toggleAction(id)}
                        className="sc__item">
                        {action}
                      </div>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
