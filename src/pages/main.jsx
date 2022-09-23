import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2';
import { increase_alpha, get_random_color } from '../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faTimes, faArrowUp, faArrowRight, faShareSquare } from '@fortawesome/free-solid-svg-icons'
import { SketchPicker } from 'react-color';
import { SpinnerCircularFixed } from 'spinners-react';
import axios from 'axios';

// const API_URL = 'http://localhost:5022';
const API_URL = 'https://mimee.ovh';

const MainPage = () => {
  const [datasets, setDatasets] = useState([])
  const [currentDataset, setCurrentDataset] = useState(0)
  const [currentColor, setCurrentColor] = useState()
  const [suffixX, setSuffixX] = useState('')
  const [suffixY, setSuffixY] = useState('')
  const [chartName, setChartName] = useState('')
  const [displayDatasets, setDisplayDatasets] = useState([])
  const [lineMode, setLineMode] = useState(1)
  const [loading, setLoading] = useState(false)
  const [awaiting, setAwaiting] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [shareId, setShareId] = useState(null)

  useEffect(() => {
    const { pathname } = window.location;
    if (pathname.startsWith('/share/')) loadShare(pathname.replace('/share/',''))
  }, [])

  useEffect(() => {
    document.title = chartName || "Charts for Genshin Optimizer"
  }, [chartName])

  useEffect(() => {
    const _datasets = datasets.slice()

    let edgePoint = null;

    _datasets.forEach( d => {
      if (lineMode === 1) {
        if (edgePoint === null || Number(d.data[0]?.x) < edgePoint) {
          edgePoint = Number(d.data[0]?.x)
        }
      } else {
        if (!edgePoint === null || Number(d.data[d.data.length-1]?.x) > edgePoint) {
          edgePoint = Number(d.data[d.data.length-1]?.x)
        }
      }
    })

    const _displayDatasets = []
    _datasets.forEach( d => {
      _displayDatasets.push(d) // push original
      
      const line = generateLineChart(d, edgePoint)
      _displayDatasets.push(line) // push generated line chart
    })
    
    setDisplayDatasets(_displayDatasets)
  }, [datasets, lineMode])

  useEffect(() => {
    setShareId(null);
  }, [datasets, lineMode, suffixX, suffixY, chartName])

  const loadShare = async (_shareId) => {
    if (!_shareId) return;
    setLoading(true);

    const url = `${API_URL}/api/share/${_shareId}`

    try {
      const response = await axios.get(url);
      setTimeout(() => {
        setLineMode(response.data.lineMode)
        setDatasets(response.data.datasets)
        setSuffixX(response.data.suffixX)
        setSuffixY(response.data.suffixY)
        setChartName(response.data.chartName)
        setTimeout(() => setShareId(_shareId), 0)
        setLoading(false);
      }, 500)
    } catch (e) {
      setLoading(false);
    }
  }

  const shareChart = async () => {
    setAwaiting(true);
    
    // const url = 'https://mimee.ovh/api/share/'
    const url = `${API_URL}/api/share/`
    
    try {
      const dataToSave = {
        lineMode,
        datasets,
        suffixX,
        suffixY,
        chartName,
      }
      const response = await axios.post(url, dataToSave);
      window.history.pushState("", "Charts for Genshin Optimizer", `/share/${response.data.id}`);
      setShareId(response.data.id)

      setTimeout(() => {
        setAwaiting(false);
        setShareMessage('Success!')
        resetShareMessage()
      }, 500)

    } catch (err) {
      console.log(err)

      setTimeout(() => {
        setAwaiting(false);
        setShareMessage('Error!')
        resetShareMessage()
      }, 500)
    }

  }

  const resetShareMessage = () => setTimeout(() => setShareMessage(''), 4000);

  const generateLineChart = (input, edgePoint) => {

    const output = JSON.parse(JSON.stringify(input))

    output.label = getUniqueDatasetName(`Max(${input.label})`)
    output.backgroundColor = increase_alpha(output.backgroundColor, 1)
    output.borderColor = increase_alpha(output.backgroundColor, 0.5)

    const sortFunc = lineMode === 1
      ? (a, b) => Number(a.x) - Number(b.x)
      : (a, b) => Number(b.x) - Number(a.x)

    const increasingX = output.data.sort(sortFunc)
    const minimumData = []

    for (const point of increasingX) {
      let last
      while ((last = minimumData.pop())) {
        if (Number(last.y) > Number(point.y)) {
          minimumData.push(last)
          break
        }
      }
      minimumData.push(point)
    }

    // if (minimumData[0].x !== increasingX[0].x)
    //   increasingX[0].min = minimumData[0].y
    
    minimumData.forEach(x => { x.min = x.y })

    // output.data = minimumData
    output.data = [
      { x: edgePoint, y: minimumData[0]?.y },
      ...minimumData
    ]

    // return { displayData: increasingX, downloadData }

    return output
  }


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        // labels: {
        //   color: "#ebecee", 
        // }
      }
    },
    scales: {
      x: {
        type: 'linear',
        grid: {
          color: '#acaeb399',
          borderDash: [2, 2],
        },
        ticks: {
          color: '#ebecee',
          callback: function(value, index, values) {
            return `${value}${suffixX}`
          }
        }
      },
      y: {
        grid: {
          color: '#acaeb399',
          borderDash: [2, 2],
        },
        ticks: {
          color: '#ebecee',
          callback: function(value, index, values) {
            return `${value}${suffixY}`
          } 
        }
      }
    },
    interaction: {
      intersect: false,
    },
    animation: {
      duration: 0
    }
  }
  
  const pasteToDataset = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const target = e.currentTarget || e
      const text = target.value
      const arr = JSON.parse(text)    
      const data = arr.map( d => ({ x: d[0].toFixed(2), y: d[1].toFixed(2), }))

      const randomColor = get_random_color();

      const newDataset = {
        label: `Paste #${datasets.length+1}`,
        data,
        stepped: 'after',
        fill: false,
        backgroundColor: increase_alpha(randomColor, 0.35),
        borderColor: '#00000000',
        borderWidth: 3,
        pointHoverRadius: 4,
        pointRadius: 2,
        hidden: false,
      }

      setCurrentColor(increase_alpha(randomColor, 1))
      setDatasets([ ...datasets, newDataset ])
      target.value = ''
    } catch (err) {
      console.log(err)
    }
  }

  // const getUniqueDatasetName = (newName) => {
  //   const ZWSP = '​'
  //   const trimmedName = newName.replaceAll(ZWSP, '') // (/​/g,'')
  //   const numberOfDupes = datasets.filter( x => x.label.replaceAll(ZWSP, '') == trimmedName ).length
  //   const ZWSPs = ZWSP.repeat(numberOfDupes)

  //   return `${ZWSPs}${trimmedName}`
  // }

  const getUniqueDatasetName = (newName) => {
    const allNames = datasets.map( x => x.label )
    const ZWSP = '​'
  
    while (allNames.includes(newName)) {
      newName = `${ZWSP}${newName}`
    }
    return newName
  }

  const toggleDatasetVisibility = (i) => {
    const _datasets = datasets.slice()
    _datasets[i].hidden = !_datasets[i].hidden
    setDatasets(_datasets)
  }

  const changeDatasetName = (e, i) => {
    const _datasets = datasets.slice()

    _datasets[i].label = getUniqueDatasetName(e.currentTarget.value)
    setDatasets(_datasets)
  }

  const deleteDataset = (i) => {
    const _datasets = datasets.slice()
    _datasets.splice(i, 1)
    setDatasets(_datasets)
  }

  const randomizeDatasetColor = (i) => {
    const _datasets = datasets.slice()
    const randomColor = get_random_color();
    _datasets[i].backgroundColor = randomColor
    // _datasets[i].borderColor = increase_alpha(randomColor, 0.5)
    setDatasets(_datasets)
    setCurrentColor(increase_alpha(randomColor, 1))
  }

  const moveDataset = (i, dir) => {
    const _datasets = datasets.slice()
    _datasets.splice(i + dir, 0, _datasets.splice(i, 1)[0])
    setDatasets(_datasets)
  }

  const handleChangeColor = (color) => {
    const _datasets = datasets.slice()

    const { h, s, l } = color.hsl
    const _hsl = `hsla(${h}, ${s * 100}%, ${l * 100}%, 0.35)`

    _datasets[currentDataset].backgroundColor = _hsl
    // _datasets[currentDataset].borderColor = add_alpha(_hsl, 0.5)
    setDatasets(_datasets)
  };

  return (
    <div className="page-wrapper">
    { shareId && (
      <div className='chart-link'>
        Share link:
        <input
          onClick={e => e.currentTarget.setSelectionRange(0, e.currentTarget.value.length)}
          // value={window.location.href}
          value={`${API_URL}/share/${shareId}`}
        />
      </div>
    )}
      <div className="card-wrapper">
        <div className="card-content">
          { loading ? (
            <div className='loading-chart-wrapper'>
              <SpinnerCircularFixed className='loading-chart' size={64} />
            </div>
          ) : (
            <>
              {datasets.length > 0 && (
                <div className="paste-list">
                  <div>
                    <div className='charts-manager'>
                      { awaiting ? (
                        <SpinnerCircularFixed className='share-btn' size={32} />
                      ) : (
                        <div onClick={() => shareChart()} className='share-btn pointer spacing'>
                          { shareMessage || 'Save / Share' }
                          <FontAwesomeIcon icon={faShareSquare} />
                        </div>
                      )}
                    </div>
                    <div className="smol-header">
                      Manage datasets
                      <div className="half-transparent">(double click input to randomize new color)</div>
                    </div>
                    <div className="paste-container">
                      <div className="toolbox" tabIndex={0}>
                        <SketchPicker
                          color={currentColor} // increase_alpha(datasets[currentDataset]?.backgroundColor, 1) || undefined}
                          onChange={(color) => setCurrentColor(color)}
                          onChangeComplete={handleChangeColor}
                        />
                      </div>
                      {datasets.map( (x, i) => (
                        <span key={`label-${x.label}`} className="single-paste">
                          <input
                            defaultValue={x.label}
                            onFocus={() => {
                              setCurrentDataset(i)
                              setCurrentColor(increase_alpha(datasets[i].backgroundColor, 1) )
                            }}
                            onBlur={(e) => changeDatasetName(e, i)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                changeDatasetName(e, i);
                                e.currentTarget.blur();
                              }
                            }}
                            onDoubleClick={() => randomizeDatasetColor(i)}
                            style={{
                              background: `linear-gradient(to right, ${increase_alpha(x.backgroundColor,1)} 0%, ${increase_alpha(x.backgroundColor,1)} 20%, #1b263b 20%)`
                            }}
                          />
                          <button
                            title="Remove dataset"
                            className="btn"
                            onClick={() => deleteDataset(i)}
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                          <div className="position-changer">
                            { i !== 0 && (
                              <span
                                title="Move left"
                                className="arrow-btn"
                                onClick={() => moveDataset(i, -1)}
                              >
                                <FontAwesomeIcon size="xs" icon={faChevronLeft} />
                              </span>
                            )}
                            { i !== datasets.length - 1 && (
                              <span
                                title="Move right"
                                className="arrow-btn"
                                onClick={() => moveDataset(i, 1)}
                              >
                                <FontAwesomeIcon size="xs" icon={faChevronRight} />
                              </span>
                            )}
                          </div>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="inputs-wrapper">
                {datasets.length > 0 && (
                  <div className="paste-wrapper">
                    <input
                      className="chart-name-input"
                      placeholder="Chart name (e.g. Beidou Burst DMG vs ER%)"
                      defaultValue={chartName || ""}
                      onBlur={(e) => setChartName(e.currentTarget.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setChartName(e.currentTarget.value);
                          e.currentTarget.blur();
                        }
                      }}
                    />
                    <div className="set-line-btn" onClick={() => setLineMode( Number(!lineMode) )}>
                      { lineMode ? <>
                          <FontAwesomeIcon icon={faArrowRight} />
                            {' Descending Line'}
                          </> 
                        : <>
                          <FontAwesomeIcon icon={faArrowUp} />
                            {' Ascending Line'}
                          </> 
                        }
                    </div>
                  </div>
                )}
                <div className="paste-wrapper">
                  <textarea
                    placeholder="Paste Genshin Optimizer Chart's Min or Full Data here..."
                    onChange={pasteToDataset}
                  />
                  {datasets.length > 0 && (
                    <div className="flex-col">
                      <input onChange={(e) => setSuffixY(e.currentTarget.value)} placeholder="Y-axis (e.g. dmg)" defaultValue={suffixY || ""}/>
                      <input onChange={(e) => setSuffixX(e.currentTarget.value)} placeholder="X-axis (e.g. % ER)" defaultValue={suffixX || ""} />
                    </div>
                  )}
                  {/* <button onClick={() => setDatasets([])} className="btn">Clear</button> */}
                </div>
                {datasets.length > 0 && (
                  <div className="chart-legend">
                    {datasets.map( (d,i) => (
                      <span 
                        key={`chart-legend-${i}`}
                        onClick={ () => toggleDatasetVisibility(i) }
                        style={{
                          textDecoration: d.hidden ? 'line-through' : 'none',
                          opacity: d.hidden ? 0.4 : 1,
                          cursor: 'pointer',
                          background: `linear-gradient(to right, ${increase_alpha(d.backgroundColor,1)} 0, ${increase_alpha(d.backgroundColor,1)} 2.5rem, transparent 2.5rem)`
                        }}
                      >
                        {d.label}
                      </span>
                    ))}
                  </div>
                )}
                {datasets.length > 0 && (
                  <div className="relative chart-wrapper">
                    <Line
                      data={{
                        datasets: displayDatasets,
                      }}
                      options={options}
                    />
                    <div className="chart-overlay">{chartName}</div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainPage
