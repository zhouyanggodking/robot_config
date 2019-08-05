// used to access common chart styles like axis, legend
import DisplayOptionHelper from '@/helpers/displayOptionHelper';

export default class ChartStyleHelper {
  static processDisplayOptions(val, displayOptions) {
    if (val === null) return null;
    const result = DisplayOptionHelper.transform(val, displayOptions);
    const unit = DisplayOptionHelper.getUnit(displayOptions);
    return `${result}${unit}`;
  }

  // common stylings
  static axisColor = '#d0d2d4'

  static catColors = [
    '#eea78f',
    '#81b4f8',
    '#8fddee',
    '#c1e787',
    '#eed88f',
    '#ee8f8f',
    '#e196f9',
    '#a497f9',
    '#b4c2d3',
    '#5463e4',
    '#be4c4c',
    '#62aec1'
  ]

  static tooltip = {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
      label: {
        show: true,
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'white',
        borderColor: 'white',
        shadowBlur: 0
      }
    },
    backgroundColor: 'rgba(0, 0, 0, .75)'
  }
  
  static legend = {
    type: 'scroll',
    orient: 'horizontal',
    top: 10,
    padding: 16,
    backgroundColor: '#f2f5f8',
    shadowBlur: 0,
    textStyle: {
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold'
    }
  }

  static grid = {
    left: 24,
    right: 48,
    containLabel: true
  }

  static xAxisStyle = {
    axisLine: {
      lineStyle: {
        width: 2,
        color: ChartStyleHelper.axisColor
      }
    },
    axisTick: {
      lineStyle: {
        width: 2,
        color: ChartStyleHelper.axisColor
      }
    },
    axisLabel: {
      color: 'black',
      showMinLabel: true,
      showMaxLabel: true
    }
  }

  static yAxisStyle = {
    type: 'value',
    axisLine: {
      lineStyle: {
        width: 2,
        color: ChartStyleHelper.axisColor
      }
    },
    axisTick: {
      lineStyle: {
        width: 2,
        color: ChartStyleHelper.axisColor
      }
    },
    axisLabel: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 14
    },    
    splitLine: {
      lineStyle: {
        type: 'dotted',
        width: 2,
        color: '#e2e2e2'
      }
    }
  }

  static sliderStyle = {
    type: 'slider',
    backgroundColor: '#e6eff3',
    fillerColor: 'rgba(69, 168, 204, 0.2)',
    borderColor: '#f4f4f4',
    handleIcon: 'image:///static/handle.svg',
    handleSize: '95%',
    dataBackground: {
      lineStyle: {
        color: '#cddde4'
      },
      areaStyle: {
        color: '#cddde4'
      }
    }          
  }
}
