import { Component } from 'react'

/**
 * Catches errors thrown by the 3D hero scene (e.g. WebGL unsupported,
 * failed HDRI fetch on a slow/blocked mobile network) so a crash there
 * doesn't take down the entire site. On error, it simply renders nothing
 * instead of the 3D scene.
 */
export default class Canvas3DErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.warn('3D scene failed to render, falling back gracefully:', error, info)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
