import React, { PureComponent } from 'react';
import options from './testData';

const defaultContainer = ({ children }) => (
  <div className="control-panel">{children}</div>
);

export default class ControlPanel extends PureComponent {
  render() {
    const {
      settings,
      containerComponent,
      onChange,
      loadNewData,
    } = { ...this.props };
    const Container = containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Interactive GeoJSON</h3>
        <hr />

        <div>
          {
            options.map(option => (
              <button key={option.name} type="button" onClick={() => loadNewData(option.url)}>{option.name}</button>
            ))
          }
        </div>
        <hr />

        <div className="input">
          <input
            type="range"
            value={settings.year}
            min={1995}
            max={2015}
            step={1}
            onChange={evt => onChange('year', evt.target.value)}
          />
        </div>
      </Container>
    );
  }
}
