console.log( "==== simpread options page: custom load ====" )

import '../assets/css/simpread.css';
import '../assets/css/options_page.css';
import '../assets/css/options_custom.css';
import '../vender/notify/notify.css';

import Velocity   from 'velocity';
import Notify     from 'notify';

import TextField  from 'textfield';
import SelField   from 'selectfield';

import Button     from 'button';
import * as waves from 'waves';
import * as tt    from 'tooltip';
import Switch     from 'switch';

import { storage, STORAGE_MODE as mode } from 'storage';
import * as ss    from 'stylesheet';
import * as conf  from 'config';
import * as ver   from 'version';
import * as watch from 'watch';
import th         from 'theme';

/**
 * Entry:
 * - storage get data form chrome storage
 * - waves.Render()
 * - tooltip.Render()
 */
storage.Read( () => {
    console.log( "simpread storage get success!", storage.focus, storage.read );
    navRender();
    propertyRender();
    setPreviewStyle();
    tt.Render( "body" );
    waves.Render({ root: "body" });
    $( "body" ).velocity({ opacity: 1 }, { duration: 1000, complete: ()=> {
        $( "body" ).removeAttr( "style" );
    }});
}); 

/**
 * navigation Render
 */
function navRender() {
    const navClick = () => {
        location.href = location.origin + "/options/options.html#labs";
    };
    const button = <Button waves="md-waves-effect md-waves-circle" hoverColor="transparent" icon={ ss.IconPath( "gohome_icon" ) } onClick={ ()=>navClick() } />;
    ReactDOM.render( button, $( ".header .nav" )[0] );
}

/**
 * Set preview style
 */
function setPreviewStyle() {
    th.Change( storage.read.theme );
    ss.FontFamily( storage.read.fontfamily );
    ss.FontSize( storage.read.fontsize );
    ss.Layout( storage.read.layout );
    $( ".preview" ).css({ "background-color": `rgba(${ th.colors[ th.names.indexOf( storage.read.theme ) ] })` });
}

/**
 * Property Render
 */
function propertyRender() {
    const getThemes = ( names, values ) => {
        const arr = [];
        return names.map( ( name, idx ) => {
            return { value: values[idx], name : name }
        });
    },
    changeTheme = ( value, name ) => {
        th.Change( th.names[conf.readLabels.indexOf( name )] );
        $( ".preview" ).css({ "background-color": `rgba(${value})` });
    };
    const doms = <div>

                    <group className="lab">
                        <h1>帮助</h1>
                        <group>
                            <p>如何自定义主题，详细 <a href="https://github.com/Kenshin/simpread/wiki/%E8%87%AA%E5%AE%9A%E4%B9%89%E4%B8%BB%E9%A2%98" target="_blank">请看这里</a></p>
                        </group>
                    </group>

                    <group className="lab">
                        <h1>全局</h1>
                        <group>
                            <SelField waves="md-waves-effect"
                                floatingtext="主题"
                                name={ conf.readLabels[ th.names.indexOf( storage.read.theme ) ] }
                                items={ getThemes( conf.readLabels, th.colors )}
                                onChange={ (v,n)=>changeTheme(v,n) }
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="字体样式"
                                placeholder="支持 CSS3 font-family 名称"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="版面布局"
                                placeholder="支持 CSS3 margin-left, margin-right 值"
                            />
                        </group>
                    </group>

                    <group className="lab">
                        <h1>标题与描述</h1>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="标题字体样式"
                                placeholder="支持 CSS3 font-family 名称"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="标题字体大小"
                                placeholder="仅支持 px 单位"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="标题颜色"
                                placeholder="支持 CSS3 color 颜色值"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="描述字体样式"
                                placeholder="支持 CSS3 font-family 名称"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="描述字体大小"
                                placeholder="仅支持 px 单位"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="描述颜色"
                                placeholder="支持 CSS3 color 颜色值"
                            />
                        </group>
                    </group>

                    <group className="lab">
                        <h1>正文</h1>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="字体样式"
                                placeholder="支持 CSS3 font-family 名称"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="字体大小"
                                placeholder="仅支持 px 单位"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="字体颜色"
                                placeholder="支持 CSS3 color 颜色值"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="字重"
                                placeholder="支持 CSS3 font-weigth 值"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="单词间距"
                                placeholder="支持 CSS3 word-spacing 值"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="字间距"
                                placeholder="支持 CSS3 letter-spacing 值"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="行间距"
                                placeholder="支持 CSS3 line-height 值"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="首行缩进"
                                placeholder="支持 CSS3 text-indent 值"
                            />
                        </group>
                    </group>

                    <group className="lab">
                        <h1>代码段</h1>
                        <group>
                            <Switch width="100%" checked={ false }
                                thumbedColor="#3F51B5" trackedColor="#7986CB" waves="md-waves-effect"
                                label="是否启用阴影"/>
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="字体样式"
                                placeholder="支持 CSS3 font-family 名称"
                            />
                        </group>
                        <group>
                            <TextField 
                                multi={ false }
                                floatingtext="字体大小"
                                placeholder="仅支持 px 单位"
                            />
                        </group>
                    </group>

                    <group className="lab">
                        <h1>自定义 CSS</h1>
                        <group>
                            <TextField 
                                multi={ true } 
                                rows={ 10 }
                            />
                        </group>
                    </group>

                    <group>
                        <group>
                            <Button type="raised" text="保存" width="100%"
                                style={{ "margin": "0" }}
                                icon={ ss.IconPath( "save_icon" ) }
                                color="#fff" backgroundColor="#3f51b5"
                                waves="md-waves-effect md-waves-button"
                            />
                        </group>

                        <group>
                            <Button type="raised" text="清空并初始化" width="100%"
                                style={{ "margin": "0" }}
                                icon={ ss.IconPath( "clear_icon" ) }
                                tooltip={{ text: "不包含：主题、字体类型、字体大小、版面布局等；" }}
                                color="#fff" backgroundColor="#FF5252"
                                waves="md-waves-effect md-waves-button"
                            />
                        </group>
                    </group>

                </div>;
    ReactDOM.render( doms, $( ".custom .property" )[0] );
}