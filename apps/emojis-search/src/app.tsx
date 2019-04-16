import { Component, Div, Element, isElement, React, Screen } from 'accursed'
import { Categories } from './categories'
import { inputOptions } from './elementOptions'
import { Home } from './home'
import { List, getCategoryEmojis } from './list'

interface P {
  screen: Screen
}
enum MenuOptions  {
  'search' = 'search', 'categories' = 'categories', 'list' = 'list', 'home'='home'
}
export class App extends Component<P, {}> {
  main: MenuOptions = MenuOptions.home
  render() {
    return (
      <Div parent={this.props.screen}>
        <Div height={5}>
          <listbar
            {...inputOptions}
            autoCommandKeys={true}
            commands={this.commands()}
            label="Menu"
            padding={1}
            focused={true}
            width="100%"
            height="100%"
          />
        </Div>
        <Div name="main-container" height="80%">
          <Main selected={this.main} />
        </Div>
      </Div>
    )
  }

  protected updateMain(s: string) {
    const mainContainer = this.findDescendant(d => isElement(d) && d.name === 'main-container')! as Element
    const main = this.findDescendant(d => isElement(d) && d.name === 'main')! as Element
    main.destroy()
    mainContainer.append(React.render(<Main selected={s} />))
    this.blessedElement.screen.render()
  }

  protected commands() {
    return {
      home: () => {
        this.updateMain('home')
      },
      search: () => {
        this.updateMain('search')
      },
      categories: () => {
        this.updateMain('categories')
      }
    }
  }
}

const Main = (props: { selected: string }) => (
  <Div name="main" height="100%">
    {props.selected === 'home' && <Home />}
    {props.selected === 'search' && <List list={Object.keys(getCategoryEmojis())[0]} />}
    {props.selected === 'categories' && <Categories />}
  </Div>
)
