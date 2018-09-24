import React, { PureComponent } from "react";

const defaultContainer = ({ children }) => (
  <div className="control-panel">{children}</div>
);

export default class ControlPanel extends PureComponent {
  render() {
    const { settings, containerComponent, onChange } = { ...this.props };
    const Container = containerComponent || defaultContainer;

    return (
      <Container>
        <h3>Interactive GeoJSON</h3>
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
